#!/usr/bin/env bash
# BEAM-ENF-V2: PostToolUse Hook — audit capture.
# Called AFTER every tool execution. Cannot block.
# Always exit 0.
#
# Per 16-MULTI-LANGUAGE-HOOK-DESIGN §6.1, this hook is a thin bash
# dispatcher: it performs NO language-specific work (no `go test`, no
# FRAME/BEAM/PRISM file parsing). It only forwards the tool call
# metadata to /api/v1/beam/enforce/post-tool; all logic lives server-
# side or in the `codewitness` binary.
#
# KILL SWITCH: echo "passphrase" > .cwt/enforcement-off
set -uo pipefail

# ── Runtime off-switch (NEXUS_HOOKS_DISABLED) ──────────────────────────
# Universal hook bypass — see hooks/lib/hooks-disabled-check.sh and
# `cw hooks disable --reason=...`. Reason mandatory; trips logged.
_CW_HOOK_NAME="beam-capture"
if [ -f "$(dirname "$0")/lib/hooks-disabled-check.sh" ]; then
  # shellcheck source=lib/hooks-disabled-check.sh
  . "$(dirname "$0")/lib/hooks-disabled-check.sh"
  cw_hooks_check_disabled || true
fi

# ── Kill switch (human-only) ──
_PROJ_ROOT="$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)"
_KILL_FILE="${CWT_DIR:-${_PROJ_ROOT}/.cwt}/enforcement-off"

INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
TOOL_ID=$(echo "$INPUT" | jq -r '.tool_use_id // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')

[ -z "$TOOL_NAME" ] && exit 0

# Hub discovery
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

_HDR=$(mktemp 2>/dev/null || echo "/tmp/.beam-capture-$$")
chmod 600 "$_HDR" 2>/dev/null || true
echo "Authorization: Bearer $API_TOKEN" > "$_HDR"
trap 'rm -f "$_HDR"' EXIT

# Fire-and-forget: POST to backend
timeout 3 curl -s \
    -X POST \
    -H @"$_HDR" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
        --arg tool "$TOOL_NAME" \
        --arg file "$FILE_PATH" \
        --arg tid "$TOOL_ID" \
        --arg sess "$SESSION_ID" \
        '{tool_name:$tool, file_path:$file, tool_use_id:$tid, session_id:$sess}')" \
    "$HUB_URL/api/v1/beam/enforce/post-tool" &>/dev/null &

exit 0
