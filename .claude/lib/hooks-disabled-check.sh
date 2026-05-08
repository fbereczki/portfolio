#!/usr/bin/env bash
# hooks/lib/hooks-disabled-check.sh — runtime off-switch for ALL Claude Code hooks.
#
# Why this file exists:
#   The .cwt/enforcement-off kill switch only disables BEAM enforcement
#   (per CLAUDE.md PROC-004 capture stays active). Operators sometimes
#   need a HARDER bypass — turn EVERY hook into a no-op without editing
#   .claude/settings.json (which is itself ENFORCE-INFRA-protected).
#   This shim is sourced by every hook script and exits 0 immediately
#   if the off-switch is engaged.
#
# Off-switch sources (any one engages):
#   1. env var CW_HOOKS_DISABLED (or legacy NEXUS_HOOKS_DISABLED) in
#      {1,true,yes,on}. Requires CW_HOOKS_DISABLE_REASON (or legacy
#      NEXUS_HOOKS_DISABLE_REASON) to be a non-empty string. Without a
#      reason the env var is IGNORED — no silent disable.
#   2. marker file at $CW_HOOKS_DISABLED_FILE (or legacy
#      NEXUS_HOOKS_DISABLED_FILE), default .nexus/hooks-disabled.
#      File contents (first non-blank line) MUST be a non-empty reason.
#      Empty/whitespace-only marker files are IGNORED — no silent disable.
#
# CW vs NEXUS prefix
#   The CodeWitness rebrand (see internal/shared/env.go) canonicalised
#   every env var to CW_*. The legacy NEXUS_* names are kept as a
#   backward-compat fallback through CW v1.0; this shim mirrors that
#   contract so an operator with NEXUS_HOOKS_DISABLED in their shell
#   keeps working (with a one-time warning emitted by the Go side).
#
# Audit invariant:
#   When the switch trips, the shim appends a JSON line to
#   $NEXUS_HOOKS_DISABLED_LOG (default .nexus/hook-disabled.log) with
#   { ts, hook, tool, session, reason, source }. Best-effort POST to
#   /api/v1/audit/events for the central audit chain — failure does NOT
#   block the hook (we're already returning exit 0).
#
# Usage from a hook:
#   _CW_HOOK_NAME="beam-enforce"
#   . "$(dirname "$0")/lib/hooks-disabled-check.sh"
#   cw_hooks_check_disabled || exit 0
#
# The function:
#   - returns 1 (failure) if hooks are NOT disabled — the hook continues normally
#   - calls `exit 0` directly if hooks ARE disabled — the hook short-circuits
#
# We use `exit 0` rather than `return 0` so callers cannot accidentally
# proceed with a stale stdin after the switch trips.

# Idempotent guard — sourcing the file twice MUST NOT redefine the
# function or repeat the audit log line.
if [ -n "${_CW_HOOKS_DISABLED_CHECK_LOADED:-}" ]; then
    return 0 2>/dev/null || true
fi
_CW_HOOKS_DISABLED_CHECK_LOADED=1

cw_hooks_check_disabled() {
    local hook_name="${_CW_HOOK_NAME:-${1:-unknown}}"
    local proj_root
    # Walk UP from this file's location to the project root.
    # Layout is `<project_root>/.claude/lib/hooks-disabled-check.sh` once
    # cw init lands the embedded copy, OR `<project_root>/hooks/lib/...`
    # in the dev tree. In both cases two `..` jumps land on the project
    # root. Fall back to PWD (Claude Code sets cwd to the project) if the
    # cd fails (sourced from a non-existent path, edge case in tests).
    proj_root="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." 2>/dev/null && pwd)"
    if [ -z "$proj_root" ] || [ ! -d "$proj_root" ]; then
        proj_root="$(pwd)"
    fi

    # CW_* canonical first, NEXUS_* legacy fallback (mirrors
    # internal/shared/env.go::LookupCanonicalEnv).
    local data_dir="${CW_DATA_DIR:-${CODEWITNESS_DATA_DIR:-${NEXUS_DATA_DIR:-${proj_root}/.nexus}}}"
    local marker="${CW_HOOKS_DISABLED_FILE:-${NEXUS_HOOKS_DISABLED_FILE:-${data_dir}/hooks-disabled}}"
    local log_file="${CW_HOOKS_DISABLED_LOG:-${NEXUS_HOOKS_DISABLED_LOG:-${data_dir}/hook-disabled.log}}"

    local source=""
    local reason=""

    # ── Env-var path ──
    local env_flag env_raw
    env_raw="${CW_HOOKS_DISABLED:-${NEXUS_HOOKS_DISABLED:-}}"
    env_flag="$(printf '%s' "$env_raw" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')"
    case "$env_flag" in
        1|true|yes|on)
            local env_reason
            env_reason="$(printf '%s' "${CW_HOOKS_DISABLE_REASON:-${NEXUS_HOOKS_DISABLE_REASON:-}}" | tr -d '\r\n' | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')"
            if [ -n "$env_reason" ]; then
                source="env"
                reason="$env_reason"
            else
                # Mandatory reason — refuse silent disable, write a loud
                # warning to stderr so the operator sees why the switch
                # did not fire, and fall through to the marker check.
                printf '[hooks-disabled] CW_HOOKS_DISABLED set but CW_HOOKS_DISABLE_REASON is empty — IGNORING (no silent disable).\n' >&2
            fi
            ;;
    esac

    # ── Marker-file path (only if env did not engage) ──
    # Marker shape written by `cw hooks disable`: "<rfc3339>\t<reason>".
    # If a tab is present, the suffix is the reason; otherwise the
    # whole non-blank first line is the reason (operator may have
    # hand-written the marker without a leading timestamp).
    if [ -z "$source" ] && [ -f "$marker" ]; then
        local file_line file_reason
        file_line="$(grep -v '^[[:space:]]*$' "$marker" 2>/dev/null | head -1)"
        case "$file_line" in
            *$'\t'*)
                file_reason="${file_line#*$'\t'}"
                ;;
            *)
                file_reason="$file_line"
                ;;
        esac
        # Trim leading/trailing whitespace from the reason.
        file_reason="$(printf '%s' "$file_reason" | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')"
        if [ -n "$file_reason" ]; then
            source="file:$marker"
            reason="$file_reason"
        else
            printf '[hooks-disabled] marker %s exists but is empty — IGNORING (no silent disable).\n' "$marker" >&2
        fi
    fi

    if [ -z "$source" ]; then
        return 1
    fi

    # ── Audit ──
    # Read the standard hook fields from environment if the caller
    # already extracted them; otherwise leave blank. We deliberately do
    # NOT consume stdin here — that would corrupt the hook's payload.
    local tool="${_CW_HOOK_TOOL:-}"
    local session="${_CW_HOOK_SESSION:-}"
    local file_path="${_CW_HOOK_FILE:-}"
    local ts
    ts="$(date -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo "")"

    mkdir -p "$(dirname "$log_file")" 2>/dev/null || true
    # Single JSON line per disabled-trip. Best-effort: a write failure
    # MUST NOT propagate (the shim is already short-circuiting to 0).
    {
        printf '{"ts":"%s","hook":"%s","tool":"%s","file":"%s","session":"%s","source":"%s","reason":"%s"}\n' \
            "$ts" \
            "$(printf '%s' "$hook_name" | sed 's/"/\\"/g')" \
            "$(printf '%s' "$tool"      | sed 's/"/\\"/g')" \
            "$(printf '%s' "$file_path" | sed 's/"/\\"/g')" \
            "$(printf '%s' "$session"   | sed 's/"/\\"/g')" \
            "$(printf '%s' "$source"    | sed 's/"/\\"/g')" \
            "$(printf '%s' "$reason"    | sed 's/"/\\"/g')" \
            >> "$log_file"
    } 2>/dev/null || true

    # Loud stderr banner so an operator (and a transcript reader) sees
    # exactly why the hook did nothing. We tag with `audit:true` so log
    # aggregators can match the audit-eligible signal.
    printf '[hooks-disabled] audit:true hook=%s source=%s reason="%s" — exit 0 (no enforcement, no capture).\n' \
        "$hook_name" "$source" "$reason" >&2

    # ── Best-effort backend audit-stream POST ──
    # We try only if jq + curl exist AND .nexus/hub.json is present.
    # Backend down or auth missing → silent skip; the local log line is
    # the system of record when offline.
    if command -v jq >/dev/null 2>&1 && command -v curl >/dev/null 2>&1; then
        local hub_url="" api_token=""
        for cfg in "${data_dir}/hub.json" "${HOME}/.nexus/hub.json"; do
            if [ -f "$cfg" ]; then
                hub_url="$(jq -r '.hub_url // .url // ""' "$cfg" 2>/dev/null)"
                api_token="$(jq -r '.token // ""' "$cfg" 2>/dev/null)"
                [ -n "$hub_url" ] && break
            fi
        done
        if [ -n "$hub_url" ] && [ -n "$api_token" ]; then
            local payload
            payload="$(jq -n \
                --arg hook "$hook_name" \
                --arg tool "$tool" \
                --arg file "$file_path" \
                --arg sess "$session" \
                --arg src  "$source" \
                --arg rsn  "$reason" \
                --arg ts   "$ts" \
                '{event_type:"hook_disabled",hook:$hook,tool:$tool,file_path:$file,session_id:$sess,source:$src,reason:$rsn,timestamp:$ts}' \
                2>/dev/null)"
            if [ -n "$payload" ]; then
                # Fire-and-forget: 2-second cap, output discarded, errors swallowed.
                curl -s --max-time 2 -X POST \
                    -H "Authorization: Bearer $api_token" \
                    -H "Content-Type: application/json" \
                    -d "$payload" \
                    "${hub_url}/api/v1/audit/events" >/dev/null 2>&1 &
            fi
        fi
    fi

    exit 0
}
