#!/usr/bin/env bash
# nexus-hook.sh — CodeWitness universal hook dispatcher (thin shim).
#
# Per 16-MULTI-LANGUAGE-HOOK-DESIGN.md §6.1 and §8, this file is the
# Tier-1 bash shim. All real logic lives in Go under the `codewitness`
# binary; this script simply:
#
#   1. Dispatches to the `go` engine (default) or the preserved legacy
#      bash path via CW_HOOK_ENGINE=legacy.
#
# NOTE: this shim used to short-circuit on the .cwt/enforcement-off
# kill switch, which silenced *all* capture events for the duration
# of the switch. That violated CLAUDE.md PROC-004 ("Capture Always
# Active") — the switch is meant to disable BEAM enforcement only.
# Capture runs unconditionally; the enforcement gate is in
# beam-enforce.sh where the kill switch remains honoured.
#   3. In `go` mode, resolves the `codewitness` binary (falls back to
#      `nexus` for backward compat) and forwards:
#        event name (argv[1])  →  `codewitness hook <event>`
#        stdin payload         →  forwarded verbatim
#      If the binary is missing, prints a loud stderr banner and exits
#      0 so commits are never blocked by a dark capture path.
#
# Exit codes are chosen to keep Claude Code / git commits unblocked:
#   - 0 = allow (default, even on soft failure)
#   - non-zero = hard block (only when a downstream engine requests it)
#
# POSIX-compatible where practical; bash features used deliberately.
set -uo pipefail

# ── Runtime off-switch (NEXUS_HOOKS_DISABLED) ──────────────────────────
# Hard kill for ALL hooks (incl. capture). Distinct from .cwt/enforcement-off
# which keeps capture running. See hooks/lib/hooks-disabled-check.sh and
# `cw hooks disable --reason=...`. Reason mandatory; trips logged.
_CW_HOOK_NAME="nexus-hook"
if [ -f "$(dirname "$0")/lib/hooks-disabled-check.sh" ]; then
  # shellcheck source=lib/hooks-disabled-check.sh
  . "$(dirname "$0")/lib/hooks-disabled-check.sh"
  cw_hooks_check_disabled || true
fi

# ── Kill switch (.cwt/enforcement-off) — PRE-TOOL PATH ONLY ────────────
# Per CLAUDE.md PROC-004 ("Capture Always Active") the capture pipeline
# MUST run regardless of the .cwt/enforcement-off kill switch. So we do
# NOT honour the switch on capture/post-tool paths.
#
# However, on the PreToolUse path (validate/pre-tool) the hook is the
# block-or-allow gate, NOT a capture endpoint. Per F2G-2 the operator
# must be able to disable enforcement with a single human-only sentinel
# without cw hooks disable being available. We honour the kill switch
# ONLY when EVENT is validate or pre-tool — capture events still flow.
_CW_KILL_FILE="${CWT_DIR:-$(dirname "$0")/../.cwt}/enforcement-off"
_CW_KILL_FILE_ALT="$(pwd)/.cwt/enforcement-off"
_kill_switch_active() {
    for f in "$_CW_KILL_FILE" "$_CW_KILL_FILE_ALT"; do
        if [ -f "$f" ]; then
            local phrase
            phrase="$(cat "$f" 2>/dev/null | tr -d '[:space:]')"
            if [ "${#phrase}" -ge 8 ]; then
                return 0
            fi
        fi
    done
    return 1
}

# ── Engine selection ──────────────────────────────────────────────────
# CW_HOOK_ENGINE=legacy pins the old bash path for one release cycle.
# Any other value (including unset) uses the new Go dispatcher.
CW_HOOK_ENGINE="${CW_HOOK_ENGINE:-go}"

if [ "$CW_HOOK_ENGINE" = "legacy" ]; then
    _legacy="$(dirname "$0")/nexus-hook.legacy.sh"
    if [ ! -x "$_legacy" ]; then
        echo "nexus-hook: CW_HOOK_ENGINE=legacy but $_legacy is missing or not executable" >&2
        exit 0
    fi
    exec "$_legacy" "$@"
fi

# ── go engine dispatch ────────────────────────────────────────────────
# Event name: argv[1]. Claude Code supplies values like:
#   pre-tool | post-tool | post-commit | session-start | ...
# Fall back to "capture" so an un-argumented invocation does not crash;
# matches the long-standing default in the legacy shim.
EVENT="${1:-capture}"

# ── PreToolUse: hard block for kill switch + enforcement infra ────────
# The backend (POST /api/v1/beam/enforce/pre-tool) is the canonical
# block, but we also bash-pre-check here so the tamper attempt fails
# in <10 ms even if the backend is offline or the 5s timeout fires.
# Defense in depth. Human-only — AI agents cannot bypass.
if [ "$EVENT" = "validate" ] || [ "$EVENT" = "pre-tool" ]; then
    # F2G-2: kill-switch + marker bypass FIRST so an operator pinned out
    # by the protected-path block has a working escape hatch. The marker
    # path was already checked at the top of the script via
    # cw_hooks_check_disabled (now with the corrected `../..` resolver),
    # but we re-check here in case the script was sourced from a layout
    # where the resolver missed (e.g. .cwt/hooks/ vs .claude/).
    if _kill_switch_active; then
        echo '{"allowed":true,"reason":"kill-switch active (.cwt/enforcement-off)","beam_status":"bypassed"}'
        echo "$(date -Iseconds) BYPASS: nexus-hook validate kill-switch active" >> "${LOGFILE:-/tmp/codewitness-hook.log}" 2>/dev/null || true
        exit 0
    fi
    _stdin_cache="$(mktemp 2>/dev/null || echo "/tmp/.nexus-hook-stdin-$$")"
    cat > "$_stdin_cache" 2>/dev/null || true
    trap 'rm -f "$_stdin_cache"' EXIT

    _tool_name="$(grep -oE '"tool_name"[[:space:]]*:[[:space:]]*"[^"]+"' "$_stdin_cache" 2>/dev/null | head -1 | sed -E 's/.*"([^"]+)"$/\1/')"
    _file_path="$(grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]+"' "$_stdin_cache" 2>/dev/null | head -1 | sed -E 's/.*"([^"]+)"$/\1/')"
    _bash_cmd="$(grep -oE '"command"[[:space:]]*:[[:space:]]*"[^"]+"' "$_stdin_cache" 2>/dev/null | head -1 | sed -E 's/.*"([^"]+)"$/\1/')"

    # Source the protect-paths helper once; both Write/Edit and Bash
    # branches reuse PROTECT_PATHS_HINTS / protect_paths_hint_for_filepath
    # so the fix_hint dispatch table is the SOLE source of truth (Group 7
    # / T7.2). The legacy duplicated case-statement strings have been
    # removed — drift between the two emitters was the bug we fixed.
    _protect_helper="$(dirname "$0")/protect-paths.sh"
    _have_protect_helper=0
    if [ -r "$_protect_helper" ]; then
        # shellcheck disable=SC1090
        . "$_protect_helper"
        _have_protect_helper=1
    fi

    case "$_tool_name" in
        Write|Edit|NotebookEdit)
            case "$_file_path" in
                *enforcement-off|*/.cwt/enforcement-off)
                    if [ "$_have_protect_helper" = 1 ]; then
                        _hint="$(protect_paths_hint_for_filepath "$_file_path")"
                        _hint_esc="$(protect_paths_json_escape "$_hint")"
                        printf '{"rule_id":"KILL-SWITCH-PROTECTED","violation":"enforcement-off is human-only","fix_hint":"%s"}\n' "$_hint_esc" >&2
                    else
                        echo '{"rule_id":"KILL-SWITCH-PROTECTED","violation":"enforcement-off is human-only","fix_hint":"Operator-only — never propose touching .cwt/enforcement-off."}' >&2
                    fi
                    echo "$(date -Iseconds) BLOCKED: AI Write enforcement-off target=$_file_path" >> "${LOGFILE:-/tmp/codewitness-hook.log}" 2>/dev/null || true
                    exit 2
                    ;;
                *.claude/settings.json|*.claude/settings.local.json|*.claude/agents/*|*.claude/commands/*|*hooks/beam-enforce.sh|*hooks/beam-capture.sh|*hooks/nsm-hooks.sh|*hooks/nsm-prompt-capture.sh|*hooks/statusline-capture.sh|*hooks/nexus-hook.sh|*hooks/nexus-hook.legacy.sh|*hooks/protect-paths.sh|*hooks/capture-hook.sh|*hooks/install.sh|*.frame/rules.yaml|*.foundation/rules.yaml|*internal/foundation/rules.yaml|*internal/storage/migrations/*|*internal/cli/embedded/*)
                    if [ "$_have_protect_helper" = 1 ]; then
                        _hint="$(protect_paths_hint_for_filepath "$_file_path")"
                        _hint_esc="$(protect_paths_json_escape "$_hint")"
                        _viol="Cannot modify enforcement infrastructure: $_file_path"
                        _viol_esc="$(protect_paths_json_escape "$_viol")"
                        printf '{"rule_id":"ENFORCE-INFRA-PROTECTED","violation":"%s","fix_hint":"%s"}\n' "$_viol_esc" "$_hint_esc" >&2
                    else
                        # Helper missing — fallback hint that does NOT
                        # name NEXUS_HOOKS_DISABLED. Per the structural
                        # rule in protect-paths.sh: only hooks/*.sh
                        # hints may mention the off-switch.
                        echo "{\"rule_id\":\"ENFORCE-INFRA-PROTECTED\",\"violation\":\"Cannot modify enforcement infrastructure: $_file_path\",\"fix_hint\":\"This path is enforcement-protected; see docs/agents/PRIMER.md#protected-paths.\"}" >&2
                    fi
                    echo "$(date -Iseconds) BLOCKED: AI Write enforcement-infra target=$_file_path" >> "${LOGFILE:-/tmp/codewitness-hook.log}" 2>/dev/null || true
                    exit 2
                    ;;
            esac
            ;;
        Bash)
            # Comprehensive bypass detection: redirection, sed/awk/perl,
            # python/ruby/node one-liners, cp/mv/install/rsync/ln,
            # heredocs, sub-shells, command-substitution, editors,
            # and direct mentions. Source the helper and delegate.
            #
            # Why source vs. exec: sourcing keeps logging/log-rotation
            # state shared and avoids forking another bash for every
            # PreToolUse — this hook fires on EVERY Claude tool call,
            # so the <10 ms budget matters.
            if [ "$_have_protect_helper" = 1 ]; then
                if ! protect_paths_check_bash "$_bash_cmd"; then
                    # protect_paths_check_bash already wrote JSON +
                    # audit line; propagate the deny code.
                    exit 2
                fi
            else
                # Helper missing — fall back to legacy minimal check
                # so we still catch the obvious cases. Fail-closed on
                # the highest-risk targets (kill-switch + settings.json)
                # rather than fail-open. Fix-hints stay neutral; we do
                # NOT name NEXUS_HOOKS_DISABLED for non-hooks paths
                # (T7.2 structural rule).
                case "$_bash_cmd" in
                    *enforcement-off*)
                        echo '{"rule_id":"KILL-SWITCH-PROTECTED","violation":"Bash cannot touch enforcement-off","fix_hint":"Operator-only — never propose touching .cwt/enforcement-off."}' >&2
                        echo "$(date -Iseconds) BLOCKED: AI Bash targets enforcement-off cmd=$_bash_cmd (helper missing)" >> "${LOGFILE:-/tmp/codewitness-hook.log}" 2>/dev/null || true
                        exit 2
                        ;;
                    *beam-enforce.sh*|*beam-capture.sh*|*nsm-hooks.sh*|*nexus-hook.sh*|*settings.json*)
                        case "$_bash_cmd" in
                            *'>'*|*'rm '*|*'mv '*|*'sed '*|*'tee '*|*'chmod '*)
                                echo "{\"rule_id\":\"ENFORCE-INFRA-PROTECTED\",\"violation\":\"Bash cannot modify enforcement infrastructure\",\"fix_hint\":\"Hook scripts are human-only. To temporarily disable for an ops emergency: cw hooks disable --reason=<reason> (audit-logged). Never propose this as a routine fix.\"}" >&2
                                echo "$(date -Iseconds) BLOCKED: AI Bash targets enforcement-infra cmd=$_bash_cmd (helper missing)" >> "${LOGFILE:-/tmp/codewitness-hook.log}" 2>/dev/null || true
                                exit 2
                                ;;
                        esac
                        ;;
                esac
            fi
            ;;
    esac

    # stdin has been consumed; replay it for the Go engine below.
    exec < "$_stdin_cache"
fi

# Log sink. Size-capped below; /tmp overflow has burned us before.
TMPBASE="${TMPDIR:-/tmp}"
LOGFILE="$TMPBASE/codewitness-hook.log"

rotate_hook_log() {
    local max_bytes=10485760   # 10 MiB
    [ -f "$LOGFILE" ] || return 0
    local size
    size="$(stat -c %s "$LOGFILE" 2>/dev/null || stat -f %z "$LOGFILE" 2>/dev/null || echo 0)"
    if [ "${size:-0}" -gt "$max_bytes" ]; then
        mv -f "$LOGFILE" "${LOGFILE}.1" 2>/dev/null || true
        : > "$LOGFILE"
    fi
}
rotate_hook_log

# Binary resolution: explicit override first, then `codewitness` on PATH,
# then `nexus` (pre-rename legacy name). We deliberately do NOT fall
# back to running arbitrary commands from CWD.
resolve_binary() {
    if [ -n "${CODEWITNESS_BINARY:-}" ] && [ -x "$CODEWITNESS_BINARY" ]; then
        printf '%s\n' "$CODEWITNESS_BINARY"
        return 0
    fi
    if [ -n "${NEXUS_BINARY:-}" ] && [ -x "$NEXUS_BINARY" ]; then
        printf '%s\n' "$NEXUS_BINARY"
        return 0
    fi
    local path
    if path="$(command -v codewitness 2>/dev/null)" && [ -n "$path" ]; then
        printf '%s\n' "$path"
        return 0
    fi
    if path="$(command -v nexus 2>/dev/null)" && [ -n "$path" ]; then
        printf '%s\n' "$path"
        return 0
    fi
    return 1
}

BINARY=""
if ! BINARY="$(resolve_binary)"; then
    cat >&2 <<EOF_BIN
codewitness binary not on PATH; capture is dark — run \`codewitness onboard\`
(or set CODEWITNESS_BINARY / NEXUS_BINARY to an executable path).
EOF_BIN
    echo "$(date -Iseconds) nexus-hook: binary missing for event=$EVENT" >> "$LOGFILE"
    # Fail-open: never block commits on a missing binary.
    exit 0
fi

# Wait briefly for an in-flight `go build` to replace the binary. Bound
# the wait so a stuck build never holds the hook forever.
BUILD_LOCK="$TMPBASE/codewitness-build.lock"
WAITED=0
while [ -f "$BUILD_LOCK" ] && [ "$WAITED" -lt 5 ]; do
    sleep 1
    WAITED=$((WAITED + 1))
done

# Forward the event + stdin to the Go engine. `hook <event>` is the
# subcommand Agent D wires through; the binary owns all downstream logic
# (FRAME validation, PRISM checks, BEAM enforcement, capture, test-run
# parsing). This shim MUST stay dumb.
#
# We pass the remaining argv through so callers can extend the contract
# without touching this file.
shift || true
set +e
"$BINARY" hook "$EVENT" "$@"
RC=$?
set -e

# Record non-zero exits for audit gap detection; the legacy script used
# to do this inline, we preserve the behaviour so dashboards stay warm.
if [ "$RC" -ne 0 ]; then
    echo "$(date -Iseconds) nexus-hook: binary rc=$RC event=$EVENT" >> "$LOGFILE"
fi

exit "$RC"
