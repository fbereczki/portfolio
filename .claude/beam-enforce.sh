#!/usr/bin/env bash
# BEAM-ENF-V2: PreToolUse Hook — PRIMARY enforcement point.
# Called by Claude Code BEFORE every Write|Edit|Bash|Agent|Skill tool.
# Exit 2 = BLOCK tool execution (hard enforcement)
# Exit 0 = ALLOW tool execution
#
# Per 16-MULTI-LANGUAGE-HOOK-DESIGN §6.1, this hook is a thin bash
# dispatcher. It performs NO language-specific work (no test runners,
# no protected-path globbing — those live in `codewitness` / the Go
# engine). It only POSTs to /api/v1/beam/enforce/pre-tool and converts
# the API decision into an exit code Claude Code understands.
#
# KILL SWITCH: echo "passphrase" > .cwt/enforcement-off
# HUMAN-ONLY: AI cannot create this file.
set -euo pipefail

# ── Runtime off-switch (NEXUS_HOOKS_DISABLED) ──────────────────────────
# Universal hook bypass — see hooks/lib/hooks-disabled-check.sh and
# `cw hooks disable --reason=...`. Reason mandatory; trips logged.
_CW_HOOK_NAME="beam-enforce"
if [ -f "$(dirname "$0")/lib/hooks-disabled-check.sh" ]; then
  # shellcheck source=lib/hooks-disabled-check.sh
  . "$(dirname "$0")/lib/hooks-disabled-check.sh"
  cw_hooks_check_disabled || true
fi

# ── Kill switch (human-only: echo "passphrase" > .cwt/enforcement-off) ──
_PROJ_ROOT="$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)"
_KILL_FILE="${CWT_DIR:-${_PROJ_ROOT}/.cwt}/enforcement-off"
if [ -f "$_KILL_FILE" ]; then
    _PHRASE=$(cat "$_KILL_FILE" 2>/dev/null | tr -d '[:space:]')
    if [ ${#_PHRASE} -ge 8 ]; then exit 0; fi
fi

# F2G-2: bootstrap-safe command allowlist. Returns 0 (true) when the
# inbound bash command is read-only enough that allowing it on a
# read-mostly step (plan/review/verify) is safer than blocking the
# operator out of basic navigation. The function deliberately stays
# CONSERVATIVE — anything unrecognised falls through to the strict
# operation_scope check.
#
# Allowed:
#   - cw / codewitness CLI (any subcommand) — the platform's own tools
#   - git status / log / diff / branch / show / rev-parse / blame
#   - ls / pwd / cat / head / tail / find / tree / which / file
#   - echo / printf (no redirection)
#
# Denied (explicit):
#   - any redirection (> >> | tee) — would bypass write protection
#   - rm / mv / cp / install / chmod / chown — write actions
#   - sed -i / awk / perl / python / ruby / node — interpreter bypass
#   - git commit / push / reset / checkout / merge / rebase — write
#
# Strict mode (CW_BEAM_STRICT_PLAN=true) skips this allowlist entirely.
cw_command_is_bootstrap_safe() {
    local cmd="$1"
    [ -z "$cmd" ] && return 1

    # Hard-deny anything that looks like a mutation. Order matters: deny
    # before allow so a `cw beam status > /tmp/x` still fails the deny.
    case "$cmd" in
        # Redirection / pipes-to-mutating-command
        *' > '*|*'>>'*|*'|tee '*|*'| tee '*|*' tee '*) return 1 ;;
        # Direct mutation verbs
        *' rm '*|*'rm -'*|*' mv '*|*' cp '*|*'install '*|*'chmod '*|*'chown '*) return 1 ;;
        # Sed -i and friends
        *'sed -i'*|*'sed --in-place'*) return 1 ;;
        # Interpreter bypass
        *'python -c'*|*'python3 -c'*|*'ruby -e'*|*'perl -e'*|*'node -e'*) return 1 ;;
        # Git mutation verbs
        *'git commit'*|*'git push'*|*'git reset'*|*'git checkout'*|*'git merge'*|*'git rebase'*|*'git apply'*|*'git stash'*) return 1 ;;
        # Heredocs into commands (`bash <<EOF`, `cat > x <<EOF`)
        *'<<'*|*'<<-'*) return 1 ;;
    esac

    # Allow patterns. We anchor on "starts with" to avoid matching the
    # mutation verb embedded in a longer pipeline.
    case "$cmd" in
        cw\ *|cw|codewitness\ *|codewitness) return 0 ;;
        'git status'*|'git log'*|'git diff'*|'git branch'*|'git show'*|'git rev-parse'*|'git blame'*|'git config --get'*|'git remote -v'*) return 0 ;;
        'ls'|'ls '*|'pwd'|'pwd '*|'cat '*|'head '*|'tail '*|'find '*|'tree'|'tree '*|'which '*|'file '*|'stat '*|'wc '*) return 0 ;;
        'echo '*|'printf '*) return 0 ;;
        # `cd` to navigate is fine on its own (no mutation).
        cd|cd\ *) return 0 ;;
    esac
    return 1
}

INPUT=$(cat)

# ── Extract tool details ──
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')

[ -z "$TOOL_NAME" ] && exit 0

# ── Hub URL + auth discovery (same pattern as nsm-hooks.sh) ──
CW_DIR="${CODEWITNESS_DATA_DIR:-${NEXUS_DATA_DIR:-.nexus}}"
HUB_URL=""
API_TOKEN=""
for cfg in "$CW_DIR/hub.json" "${HOME}/.nexus/hub.json"; do
    if [ -f "$cfg" ] && command -v jq &>/dev/null; then
        HUB_URL=$(jq -r '.hub_url // .url // ""' "$cfg" 2>/dev/null)
        API_TOKEN=$(jq -r '.token // ""' "$cfg" 2>/dev/null)
        [ -n "$HUB_URL" ] && break
    fi
done
[ -z "$HUB_URL" ] && HUB_URL="http://localhost:9142"
[ -z "$API_TOKEN" ] && API_TOKEN=$(cat ~/.nexus/api-token 2>/dev/null | tr -d '[:space:]' || true)

# Auth header in temp file (avoid ps aux exposure)
_HDR=$(mktemp 2>/dev/null || echo "/tmp/.beam-enforce-$$")
chmod 600 "$_HDR" 2>/dev/null || true
echo "Authorization: Bearer $API_TOKEN" > "$_HDR"
trap 'rm -f "$_HDR"' EXIT

# ── Local cache: skip API if no active BEAM run ──
CACHE_FILE="$CW_DIR/beam-enforcement-cache.json"
if [ -f "$CACHE_FILE" ]; then
    CACHED_STATUS=$(jq -r '.beam_status // "unknown"' "$CACHE_FILE" 2>/dev/null || echo "unknown")
    CACHED_AT=$(jq -r '.cached_at // 0' "$CACHE_FILE" 2>/dev/null || echo "0")
    NOW=$(date +%s)
    AGE=$(( NOW - CACHED_AT ))

    if [ "$CACHED_STATUS" = "no_active_run" ] && [ "$AGE" -lt 60 ]; then
        exit 0
    fi
fi

# ── Call backend ──
RESULT=$(timeout 3 curl -s \
    -X POST \
    -H @"$_HDR" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
        --arg tool "$TOOL_NAME" \
        --arg file "$FILE_PATH" \
        --arg cmd "$COMMAND" \
        --arg sess "$SESSION_ID" \
        '{tool_name:$tool, file_path:$file, command:$cmd, session_id:$sess}')" \
    "$HUB_URL/api/v1/beam/enforce/pre-tool" 2>/dev/null) || true

# ── FAIL-OPEN: backend unreachable → allow + log gap ──
if [ -z "$RESULT" ]; then
    mkdir -p "$CW_DIR" 2>/dev/null || true
    echo "{\"ts\":\"$(date -Iseconds)\",\"gap\":\"api_unreachable\",\"tool\":\"$TOOL_NAME\"}" \
        >> "$CW_DIR/enforcement-gaps.jsonl" 2>/dev/null || true
    exit 0
fi

# ── Parse response ──
ALLOWED=$(echo "$RESULT" | jq -r '.allowed // true')
REASON=$(echo "$RESULT" | jq -r '.reason // ""')
BEAM_STATUS=$(echo "$RESULT" | jq -r '.beam_status // "unknown"')
# Group 7 / T7.5 — pull the literal advance verb from the response so
# the block message names BOTH the failure reason AND the legitimate
# recovery command. Empty when the block is not an FSM transition
# (infra-protected, kill-switch, guard, terminal step).
ADVANCE_COMMAND=$(echo "$RESULT" | jq -r '.advance_command // ""')
NEXT_STEP=$(echo "$RESULT" | jq -r '.next_step // ""')

# Update cache
mkdir -p "$CW_DIR" 2>/dev/null || true
jq -n --arg s "$BEAM_STATUS" --argjson t "$(date +%s)" \
    '{beam_status:$s, cached_at:$t}' > "$CACHE_FILE" 2>/dev/null || true

# ── Decision ──
if [ "$ALLOWED" = "true" ]; then
    # ADR-001: per-step OperationScope check. If the active BEAM step declared
    # a non-empty operation_scope list, TOOL_NAME must be a member. The hook
    # is the fast path; the operation_scope_respected gate check is the
    # system of record at step-advance time.
    SCOPE_JSON=$(timeout 3 curl -s --max-time 3 \
        -H @"$_HDR" \
        "$HUB_URL/api/v1/beam/current-step/operation-scope" 2>/dev/null) || true

    if [ -n "$SCOPE_JSON" ]; then
        SCOPE=$(echo "$SCOPE_JSON" | jq -r '.operation_scope // [] | join(" ")' 2>/dev/null)
        ACTIVE_STEP=$(echo "$SCOPE_JSON" | jq -r '.step_id // ""' 2>/dev/null)
        if [ -n "$SCOPE" ]; then
            # Non-empty scope — membership check.
            FOUND=0
            for op in $SCOPE; do
                if [ "$op" = "$TOOL_NAME" ]; then
                    FOUND=1
                    break
                fi
            done
            if [ "$FOUND" = "0" ]; then
                # F2G-2 BOOTSTRAP ALLOWLIST: a freshly-onboarded project
                # lands on a read-mostly step (plan / review / verify)
                # whose operation_scope excludes Bash, but the operator
                # NEEDS Bash to run `cw beam status`, `cw beam advance`,
                # `git status`, etc. just to navigate. Without an escape
                # hatch the system is unusable. Strict mode (operator
                # opt-in via CW_BEAM_STRICT_PLAN=true) preserves the old
                # behaviour. Default mode allows a small known-safe set.
                if [ "$TOOL_NAME" = "Bash" ] && [ "${CW_BEAM_STRICT_PLAN:-false}" != "true" ]; then
                    if cw_command_is_bootstrap_safe "$COMMAND"; then
                        # Allow + log so the bypass is auditable.
                        echo "$(date -Iseconds) BOOTSTRAP-ALLOWLIST step=$ACTIVE_STEP cmd=$(printf '%s' "$COMMAND" | head -c 200)" \
                            >> "$CW_DIR/enforcement-bootstrap-allowlist.log" 2>/dev/null || true
                        exit 0
                    fi
                fi
                echo "[BEAM-ENFORCE] operation_scope violation: step '$ACTIVE_STEP' permits [$SCOPE], not '$TOOL_NAME'"
                # F2G-2: helpful hint so the operator knows the escape hatch.
                if [ "$TOOL_NAME" = "Bash" ]; then
                    echo "  Hint: read-only commands (cw, git status/log/diff/branch, ls, cat, pwd, head, tail, find, tree, which) are usually safe at step '$ACTIVE_STEP'."
                    echo "  To advance the workflow: \`cw beam advance --to=implement --reason=<why>\`"
                    echo "  To temporarily disable enforcement: \`cw hooks disable --reason=<why>\` (audit-logged)"
                fi
                exit 2
            fi
        fi
    fi
    exit 0
fi

# Group 7 / T7.5 — emit the literal advance command on a second
# stderr line so the agent reading the block message sees BOTH the
# reason AND the recovery verb. Skipped when the response did not
# carry an advance_command (infra-protected blocks, terminal step,
# missing engine helper). Format mirrors REASON for grep-ability.
echo "[BEAM-ENFORCE] $REASON"
if [ -n "$ADVANCE_COMMAND" ]; then
    echo "[BEAM-ENFORCE] advance: $ADVANCE_COMMAND (next_step: $NEXT_STEP)"
fi
exit 2
