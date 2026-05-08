#!/bin/bash
# PL-602: NSM unified hook — all 9 hooks route to NSM API.
# Usage: nsm-hooks.sh <hook_type>
# Hook types: session_start, prompt_submit, pre_tool, post_tool,
#             stop, task_complete, config_change, post_compact, status_line
#
# KILL SWITCH: echo "passphrase" > .cwt/enforcement-off


# ── Runtime off-switch (NEXUS_HOOKS_DISABLED) ──────────────────────────
# Universal hook bypass — see hooks/lib/hooks-disabled-check.sh and
# `cw hooks disable --reason=...`. Reason mandatory; trips logged.
_CW_HOOK_NAME="nsm-hooks"
if [ -f "$(dirname "$0")/lib/hooks-disabled-check.sh" ]; then
  # shellcheck source=lib/hooks-disabled-check.sh
  . "$(dirname "$0")/lib/hooks-disabled-check.sh"
  cw_hooks_check_disabled || true
fi
# ── Kill switch (human-only) ──
# Derive project root from this script's location (hooks/ is in project root)
_PROJ_ROOT="$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)"
_KILL_FILE="${CWT_DIR:-${_PROJ_ROOT}/.cwt}/enforcement-off"
if [ -f "$_KILL_FILE" ]; then
    _PHRASE=$(cat "$_KILL_FILE" 2>/dev/null | tr -d '[:space:]')
    if [ ${#_PHRASE} -ge 8 ]; then exit 0; fi
fi

HOOK_TYPE="${1:-pre_tool}"
INPUT=$(cat)
TMPBASE="${TMPDIR:-/tmp}"
LOGFILE="$TMPBASE/nsm-hook.log"

# Discover Hub URL
HUB_URL=""
API_TOKEN=""
for cfg in ".nexus/hub.json" "${HOME}/.nexus/hub.json"; do
  if [ -f "$cfg" ] && command -v jq &>/dev/null; then
    HUB_URL=$(jq -r '.hub_url // ""' "$cfg" 2>/dev/null)
    API_TOKEN=$(jq -r '.token // ""' "$cfg" 2>/dev/null)
    [ -n "$HUB_URL" ] && break
  fi
done
[ -z "$HUB_URL" ] && HUB_URL="http://localhost:9142"
[ -z "$API_TOKEN" ] && API_TOKEN=$(cat ~/.nexus/api-token 2>/dev/null | tr -d '[:space:]')
# Write auth header to temp file to avoid token exposure in process list (ps aux).
_CURL_HEADER_FILE=$(mktemp 2>/dev/null || echo "/tmp/.nsm-curl-$$")
chmod 600 "$_CURL_HEADER_FILE" 2>/dev/null
echo "Authorization: Bearer $API_TOKEN" > "$_CURL_HEADER_FILE"
trap 'rm -f "$_CURL_HEADER_FILE"' EXIT

nsm_query() {
  curl -s --max-time 3 -H @"$_CURL_HEADER_FILE" "$HUB_URL/api/v1/nsm/$1" 2>/dev/null
}

nsm_post() {
  curl -s --max-time 3 -X POST -H @"$_CURL_HEADER_FILE" -H "Content-Type: application/json" -d "$2" "$HUB_URL/api/v1/nsm/$1" 2>/dev/null
}

case "$HOOK_TYPE" in

  session_start)
    # SessionStart: restore NSM state and inject context.
    STATE=$(nsm_query "state")
    if [ -n "$STATE" ]; then
      CURRENT=$(echo "$STATE" | jq -r '.state // "idle"' 2>/dev/null)
      TASK=$(echo "$STATE" | jq -r '.task_key // ""' 2>/dev/null)
      REMAINING=$(echo "$STATE" | jq -r '.remaining_substeps // [] | join(", ")' 2>/dev/null)
      FILES=$(echo "$STATE" | jq -r '.file_change_count // 0' 2>/dev/null)

      # CW-1028 fix: reconcile active-task file with NSM state.
      # CW-1032 fix: do NOT clobber active-task if the file value is a valid child of the NSM epic/parent.
      # Rationale: user may be working on a sub-task (e.g. CW-1019-EPIC-8) while NSM tracks the parent epic (CW-1019).
      # Clobbering to the parent loses the real work target and breaks capture task_key attribution.
      ACTIVE_TASK_FILE=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null | tr -d '[:space:]')
      if [ -n "$ACTIVE_TASK_FILE" ] && [ -n "$TASK" ] && [ "$ACTIVE_TASK_FILE" != "$TASK" ]; then
        # Check if file value is a child/descendant of NSM task (prefix match on TASK + "-" OR shared parent prefix).
        # Examples: NSM=CW-1019, file=CW-1019-EPIC-8  → child, respect file
        #          NSM=CW-1007, file=CW-1019-EPIC-8  → unrelated, sync to NSM
        IS_CHILD=false
        case "$ACTIVE_TASK_FILE" in
          "$TASK"-*) IS_CHILD=true ;;
        esac
        # Also respect file if it shares the top-level project key (e.g. both start with CW-1019)
        if [ "$IS_CHILD" = "false" ]; then
          FILE_ROOT=$(echo "$ACTIVE_TASK_FILE" | cut -d- -f1-2)
          TASK_ROOT=$(echo "$TASK" | cut -d- -f1-2)
          if [ -n "$FILE_ROOT" ] && [ "$FILE_ROOT" = "$TASK_ROOT" ]; then
            IS_CHILD=true
          fi
        fi
        if [ "$IS_CHILD" = "true" ]; then
          echo "[NSM] active-task '$ACTIVE_TASK_FILE' is a valid child/sibling of NSM task '$TASK' — respecting file (CW-1032)"
        else
          echo "[NSM] ⚠ SYNC DRIFT: active-task file says '$ACTIVE_TASK_FILE' but NSM state says '$TASK'"
          echo "[NSM] Syncing NSM as source of truth: writing '$TASK' to active-task"
          echo "$TASK" > "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null
        fi
      fi

      if [ "$CURRENT" = "idle" ]; then
        echo "[NSM] State: IDLE — no active workflow. A workflow will start automatically with your first prompt."
        echo "[NSM] Available workflows: prism-light, full-lifecycle, bugfix, investigation, refactor"
        echo "[NSM] SWQ-STD-001: Every code modification requires an active workflow with Jira task and pseudocode++ plan."
        echo "[NSM] Agents available: orchestrator, product-owner, sw-ba, sw-architect, senior-developer, ui-designer, cybersecurity-developer, cybersecurity-pentester, senior-sdet"
      else
        echo "[NSM] Resuming: state=$CURRENT | task=$TASK | remaining substeps: ${REMAINING:-none} | files changed: $FILES"
        # CW-1028 fix: warn if stuck in implement with automatable substeps
        if [ "$CURRENT" = "implement" ] && echo "$REMAINING" | grep -qE "go_vet_pass|no_secrets|sql_parameterized|files_modified"; then
          echo "[NSM] ⚠ Automatable substeps pending — post_tool hook will complete them after next Write/Edit"
        fi
      fi
    else
      echo "[NSM] Cannot reach server — enforcement running in offline mode"
    fi
    exit 0
    ;;

  prompt_submit)
    # CW-1028 fix: INJECT pending bugfix queue into EVERY user prompt context.
    # This forces Claude Code (AI) to see pending bugs on every turn and act on them.
    # Without this, errors stay in the queue unfixed because Claude has no trigger.
    BUGFIX_QUEUE=$(curl -s --max-time 2 -H @"$_CURL_HEADER_FILE" \
      "$HUB_URL/api/v1/errors/auto-bugfix/queue?status=pending&limit=10" 2>/dev/null)
    if [ -n "$BUGFIX_QUEUE" ]; then
      PENDING_COUNT=$(echo "$BUGFIX_QUEUE" | jq -r '.count // 0' 2>/dev/null)
      if [ -n "$PENDING_COUNT" ] && [ "$PENDING_COUNT" != "0" ] && [ "$PENDING_COUNT" != "null" ]; then
        echo "================================================================"
        echo "[AUTO-BUGFIX] 🔴 $PENDING_COUNT PENDING BUG(S) DETECTED"
        echo "================================================================"
        echo "[AUTO-BUGFIX] MANDATORY: Fix these bugs BEFORE responding to the user."
        echo "[AUTO-BUGFIX] Order: by severity (critical > error > warning), then FIFO."
        echo ""
        echo "$BUGFIX_QUEUE" | jq -r '.queue[] | "  BUG #\(.id) [\(.severity)] \(.source) \(.error_type // "?"): \(.error_message[:150])"' 2>/dev/null
        echo ""
        echo "[AUTO-BUGFIX] Flow: dispatch builder agent → fix → test → PUT /errors/auto-bugfix/{id}/status status=done"
        echo "[AUTO-BUGFIX] Then mark error as resolved: PUT /errors/{error_log_id}/resolve"
        echo "[AUTO-BUGFIX] User request is SECONDARY until queue is empty (unless explicitly says 'ignore bugs')."
        echo "================================================================"
        echo ""
      fi
    fi

    # UserPromptSubmit: AUTO-START workflow if idle. This ACTS, not just advises.
    STATE=$(nsm_query "state")
    # FAIL-OPEN: server unreachable → default to idle so workflow can still start.
    if [ -z "$STATE" ]; then
      CURRENT="idle"
      TASK=""
      REMAINING=""
    else
      CURRENT=$(echo "$STATE" | jq -r 'if .state then .state else "idle" end' 2>/dev/null)
      TASK=$(echo "$STATE" | jq -r '.task_key // ""' 2>/dev/null)
      REMAINING=$(echo "$STATE" | jq -r '.remaining_substeps // [] | join(", ")' 2>/dev/null)
    fi

    if [ "$CURRENT" = "idle" ]; then
      PROMPT_TEXT=$(echo "$INPUT" | jq -r '.message // ""' 2>/dev/null)
      if [ -z "$PROMPT_TEXT" ]; then
        exit 0
      fi

      # ── Step 1: Classify workflow ──
      PROMPT_LOWER=$(echo "$PROMPT_TEXT" | tr '[:upper:]' '[:lower:]')
      WF_TYPE="prism-light"
      WF_REASON="default: user request"

      if echo "$PROMPT_LOWER" | grep -qE "^/prism|prism session"; then
        WF_TYPE="full-lifecycle"
        WF_REASON="explicit /prism command"
      # CW-1028 fix: full-lifecycle for architectural / complex / critical / security work
      elif echo "$PROMPT_LOWER" | grep -qE "teljes rendszer|komplett rendszer|complete system|full stack|full architecture|saas|multi-tenant|multi tenancy|új modul|new module|új architektúra|new architecture|iso 26262|iso 21434|asil|do-178c|compliance|soc 2|eu ai act|end-to-end|full flow"; then
        WF_TYPE="full-lifecycle"
        WF_REASON="architectural/complex/compliance scope detected"
      elif echo "$PROMPT_LOWER" | grep -qE "kritikus|critical|biztonsági|security critical|vulnerability|cve|owasp|pentest|exploit|auth bypass|privilege escalation"; then
        WF_TYPE="full-lifecycle"
        WF_REASON="security-critical scope detected"
      elif echo "$PROMPT_LOWER" | grep -qE "bug|hiba|nem működik|nem indul|error|crash|panic|nem megy|broken|fix|javít"; then
        WF_TYPE="bugfix"
        WF_REASON="bug/error detected in prompt"
      elif echo "$PROMPT_LOWER" | grep -qE "vizsgáld|nézd meg|research|investigate|elemezd|analyze|check|ellenőrizd"; then
        WF_TYPE="investigation"
        WF_REASON="research/investigation request"
      elif echo "$PROMPT_LOWER" | grep -qE "refaktor|refactor|clean up|takarít|átszervez|reorganize|restructure|egyszerűsít"; then
        WF_TYPE="refactor"
        WF_REASON="refactor request"
      fi

      # ── Step 2: Create FRAME item (built-in task management) ──
      ITEM_TYPE="task"
      if [ "$WF_TYPE" = "full-lifecycle" ]; then
        ITEM_TYPE="initiative"
      elif [ "$WF_TYPE" = "prism-light" ] || [ "$WF_TYPE" = "refactor" ]; then
        ITEM_TYPE="epic"
      fi

      PROMPT_SUMMARY=$(echo "$PROMPT_TEXT" | head -c 200 | tr '\n' ' ')
      # Use jq for safe JSON construction — prevents shell/JSON injection
      FRAME_PAYLOAD=$(jq -n --arg type "$ITEM_TYPE" --arg title "$PROMPT_SUMMARY" \
        --arg wf "$WF_TYPE" --arg prio "medium" \
        '{item_type: $type, title: $title, workflow_type: $wf, priority: $prio}')
      FRAME_RESULT=$(curl -s --max-time 5 -X POST \
        -H "$AUTH" -H "Content-Type: application/json" \
        -d "$FRAME_PAYLOAD" \
        "$HUB_URL/api/v1/frame/items" 2>/dev/null)
      TASK_KEY=$(echo "$FRAME_RESULT" | jq -r '.id // ""' 2>/dev/null)
      FRAME_OK=false
      if [ -n "$TASK_KEY" ] && [ "$TASK_KEY" != "null" ]; then
        FRAME_OK=true
      else
        TASK_KEY="CW-$(date +%s | tail -c 7)"
      fi

      # ── Step 2b: Also create in Jira if configured (sync) ──
      JIRA_URL_ENV=$(printenv JIRA_URL 2>/dev/null)
      JIRA_TOKEN_ENV=$(printenv JIRA_TOKEN 2>/dev/null)
      JIRA_EMAIL_ENV=$(printenv JIRA_EMAIL 2>/dev/null)
      JIRA_OK=false
      if [ -n "$JIRA_URL_ENV" ] && [ -n "$JIRA_TOKEN_ENV" ]; then
        JIRA_PAYLOAD=$(jq -n --arg key "PL" --arg summary "[${TASK_KEY}] ${PROMPT_SUMMARY}" \
          '{fields: {project: {key: $key}, summary: $summary, issuetype: {name: "Task"}}}')
        curl -s --max-time 10 -X POST \
          -H "Authorization: Basic $(echo -n "${JIRA_EMAIL_ENV}:${JIRA_TOKEN_ENV}" | base64)" \
          -H "Content-Type: application/json" \
          -d "$JIRA_PAYLOAD" \
          "${JIRA_URL_ENV}/rest/api/3/issue" >/dev/null 2>&1 &
        JIRA_OK=true
      fi

      # ── Step 4: Configure NSM + transition to PLAN ──
      SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""' 2>/dev/null)
      nsm_post "configure" "{\"task_key\":\"${TASK_KEY}\",\"session_id\":\"${SESSION_ID}\"}" >/dev/null 2>&1

      # Transition IDLE → PLAN (task_key is the precondition, already set via configure)
      nsm_post "transition" "{\"to\":\"plan\",\"reason\":\"auto-start: ${WF_TYPE} (${WF_REASON})\"}" >/dev/null 2>&1

      # NOW in PLAN state — complete auto-completable substeps
      for ss in task_key_set prism_session beam_run_started; do
        nsm_post "substep" "{\"substep_id\":\"$ss\"}" >/dev/null 2>&1
      done

      # ── Step 5: Write active-task file ──
      echo "$TASK_KEY" > "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null

      # ── Step 6: Log ──
      echo "$(date -Iseconds) NSM AUTO-START: workflow=$WF_TYPE task=$TASK_KEY jira=$JIRA_OK" >> "$LOGFILE"

      # ── Step 7: Inject context ──
      SYNC_NOTE=""
      if [ "$JIRA_OK" = "true" ]; then SYNC_NOTE=" + Jira sync"; fi
      if [ "$FRAME_OK" = "true" ]; then
        echo "[NSM] Workflow STARTED: $WF_TYPE | Task: $TASK_KEY ($ITEM_TYPE in FRAME${SYNC_NOTE})"
      else
        echo "[NSM] Workflow STARTED: $WF_TYPE | Task: $TASK_KEY (local key — FRAME API unreachable)"
      fi
      echo "[NSM] State: PLAN"
      echo "[NSM] MANDATORY: Write plan document with pseudocode++ for task $TASK_KEY"
      echo "[NSM] Remaining substep: plan_written (complete via POST /api/v1/nsm/substep)"
      echo "[NSM] Write/Edit BLOCKED until IMPLEMENT state. Read/Grep/Glob allowed for research."
      echo "[NSM] Workflow: $(case $WF_TYPE in
        prism-light) echo "PLAN → REVIEW → JIRA-EXPORT → IMPLEMENT → TEST → VERIFY → COMPLETE" ;;
        full-lifecycle) echo "PLAN → REVIEW(loop 90%) → JIRA-EXPORT → HUMAN-GATE → IMPLEMENT → TEST → VERIFY → DEVIATION-CHECK → COMPLETE" ;;
        bugfix) echo "PLAN → JIRA-EXPORT → REPRODUCE → FIX → TEST → VERIFY → COMPLETE" ;;
        investigation) echo "RESEARCH → ANALYZE → DOCUMENT → COMPLETE" ;;
        refactor) echo "PLAN → JIRA-EXPORT → IMPLEMENT → VERIFY-NO-REGRESSION → COMPLETE" ;;
      esac)"

    else
      # ── Active workflow — check for scope drift ──
      # CW-1028 fix: detect if new prompt is a scope drift from current task
      PROMPT_TEXT=$(echo "$INPUT" | jq -r '.message // ""' 2>/dev/null)
      PROMPT_LOWER=$(echo "$PROMPT_TEXT" | tr '[:upper:]' '[:lower:]')

      # Detect "big new task" signals that warrant a new PRISM session
      DRIFT_SIGNALS=0
      if echo "$PROMPT_LOWER" | grep -qE "teljes rendszer|komplett rendszer|complete system|full architecture|saas|multi-tenant|új modul|new module|új feature|új architektúra"; then
        DRIFT_SIGNALS=$((DRIFT_SIGNALS+2))
      fi
      if echo "$PROMPT_LOWER" | grep -qE "csináljuk|let's build|build the|create the|implement the|implementáljuk|építsük"; then
        DRIFT_SIGNALS=$((DRIFT_SIGNALS+1))
      fi

      if [ "$DRIFT_SIGNALS" -ge 2 ]; then
        echo ""
        echo "================================================================"
        echo "[NSM] ⚠ SCOPE DRIFT DETECTED"
        echo "================================================================"
        echo "[NSM] Current task: $TASK (state: $CURRENT)"
        echo "[NSM] Current prompt suggests a NEW major task (not continuation)."
        echo "[NSM]"
        echo "[NSM] Options:"
        echo "[NSM]   A) Commit + close $TASK, then start new PRISM full-lifecycle session"
        echo "[NSM]   B) Continue $TASK (this prompt is a sub-step of the current work)"
        echo "[NSM]   C) Add as a subtask under $TASK"
        echo "[NSM]"
        echo "[NSM] The AI MUST confirm with the user before proceeding."
        echo "[NSM] Suggested: Option A — this is a PRISM-worthy task."
        echo "================================================================"
        # Don't block, but warn strongly — the AI should propose a PRISM session
      fi

      # ── Active workflow — sync FRAME task status ──
      if [ -n "$TASK" ]; then
        FRAME_STATUS=""
        case "$CURRENT" in
          plan|refine|review|gate) FRAME_STATUS="in_progress" ;;
          implement) FRAME_STATUS="in_progress" ;;
          test|verify) FRAME_STATUS="review" ;;
          complete|done|accept) FRAME_STATUS="done" ;;
        esac
        if [ -n "$FRAME_STATUS" ]; then
          STATUS_PAYLOAD=$(jq -n --arg s "$FRAME_STATUS" --arg r "NSM state: $CURRENT" --arg by "nsm" \
            '{status: $s, reason: $r, changed_by: $by}')
          curl -s --max-time 2 -X PUT -H "$AUTH" -H "Content-Type: application/json" \
            -d "$STATUS_PAYLOAD" \
            "$HUB_URL/api/v1/frame/items/$TASK/status" >/dev/null 2>&1 &
        fi
      fi

      echo "[NSM] State: $CURRENT | Task: $TASK"
      if [ -n "$REMAINING" ]; then
        echo "[NSM] Remaining substeps: $REMAINING"
      fi
      case "$CURRENT" in
        plan)     echo "[NSM] Write plan document with pseudocode++. Complete 'plan_written' to advance." ;;
        review)   echo "[NSM] Run 3-agent review. Complete security_review, quality_review, compliance_review, report_generated." ;;
        implement) echo "[NSM] IMPLEMENT: Write/Edit ALLOWED. Follow pseudocode++." ;;
        test)     echo "[NSM] TEST: Run tests. Only *_test.go modifiable." ;;
        verify)   echo "[NSM] VERIFY: Deterministic gate. All checks must pass." ;;
        gate)     echo "[NSM] GATE: Quality gate evaluation." ;;
        complete) echo "[NSM] COMPLETE: Move task to Done, write evidence." ;;
        *) ;;
      esac
    fi
    exit 0
    ;;

  pre_tool)
    # PreToolUse: ask NSM if action is allowed.
    TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""' 2>/dev/null)
    FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""' 2>/dev/null)
    COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""' 2>/dev/null)

    if [ -z "$TOOL_NAME" ]; then
      exit 0  # Unknown tool → allow
    fi

    # Query NSM
    PARAMS="action=${TOOL_NAME}&file=$(echo "$FILE_PATH" | sed 's/ /%20/g')&command=$(echo "$COMMAND" | head -c 200 | sed 's/ /%20/g')"
    RESULT=$(nsm_query "can-perform?$PARAMS")

    # FAIL-OPEN: If server is unreachable, allow the action and log.
    # Without this, a down server deadlocks ALL tools (Bash included),
    # making it impossible to restart the server from within Claude Code.
    if [ -z "$RESULT" ]; then
      echo "$(date -Iseconds) NSM OFFLINE: allowing $TOOL_NAME (server unreachable)" >> "$LOGFILE"
      exit 0
    fi

    ALLOWED=$(echo "$RESULT" | jq -r 'if .allowed then "true" else "false" end' 2>/dev/null)
    REASON=$(echo "$RESULT" | jq -r '.reason // ""' 2>/dev/null)
    NSM_STATE=$(echo "$RESULT" | jq -r '.state // "idle"' 2>/dev/null)

    # ENFORCEMENT: In REVIEW state, only Agent tool is allowed (must dispatch to FORGE agents).
    # Write/Edit/Bash are blocked — the AI must delegate, not implement.
    if [ "$NSM_STATE" = "review" ] && [ "$TOOL_NAME" != "Agent" ] && [ "$TOOL_NAME" != "Read" ] && [ "$TOOL_NAME" != "Grep" ] && [ "$TOOL_NAME" != "Glob" ]; then
      echo "BLOCKED: In REVIEW state, only Agent/Read/Grep/Glob tools allowed. You MUST delegate review to FORGE agents (guardian, sentinel, warden). Use the Agent tool."
      echo "$(date -Iseconds) REVIEW ENFORCEMENT: blocked $TOOL_NAME — must use Agent tool" >> "$LOGFILE"
      exit 2
    fi

    # ENFORCEMENT: If in implement state and Write/Edit, check PRISM gate score.
    # This prevents bypassing review — cannot write code if PRISM review not done.
    if [ "$ALLOWED" = "true" ] && [ "$NSM_STATE" = "implement" ] && ([ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]); then
      ACTIVE_PRISM=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-prism-session" 2>/dev/null | tr -d '[:space:]')
      if [ -n "$ACTIVE_PRISM" ]; then
        GATE=$(curl -s --max-time 3 -H "$AUTH" "$HUB_URL/api/v1/prism/session/$ACTIVE_PRISM/gate" 2>/dev/null)
        GATE_SCORE=$(echo "$GATE" | jq -r '.score // 0' 2>/dev/null)
        GATE_REVIEWS=$(echo "$GATE" | jq -r '[.checks[] | select(.name == "Review work done")] | .[0].score // 0' 2>/dev/null)

        if [ "$(echo "$GATE_SCORE < 50" | bc -l 2>/dev/null)" = "1" ] && [ "$GATE_REVIEWS" = "0" ]; then
          echo "$(date -Iseconds) PRISM BLOCK: gate=$GATE_SCORE% reviews=$GATE_REVIEWS — review not done" >> "$LOGFILE"
          echo "BLOCKED: PRISM session $ACTIVE_PRISM has no review (gate: ${GATE_SCORE}%). Complete PRISM review before writing code."
          ALLOWED="false"
        fi
      fi
    fi

    if [ "$ALLOWED" = "false" ]; then
      echo "$(date -Iseconds) NSM BLOCK: $TOOL_NAME $FILE_PATH — $REASON" >> "$LOGFILE"
      # Exit 2 = deny with reason shown to user
      echo "$REASON"
      exit 2
    fi

    # Also run FRAME validators (existing codewitness-hook.sh validate logic)
    # For now, delegate to existing hook if present
    if [ -f "hooks/codewitness-hook.sh" ]; then
      echo "$INPUT" | NEXUS_BINARY="${NEXUS_BINARY:-./nexus}" hooks/codewitness-hook.sh validate
      EXIT_CODE=$?
      if [ $EXIT_CODE -ne 0 ]; then
        exit $EXIT_CODE
      fi
    fi

    exit 0
    ;;

  post_tool)
    # PostToolUse: record action with FULL file change data.
    TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""' 2>/dev/null)
    FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""' 2>/dev/null)
    TOOL_ID=$(echo "$INPUT" | jq -r '.tool_use_id // ""' 2>/dev/null)
    OLD_STRING=$(echo "$INPUT" | jq -r '.tool_input.old_string // ""' 2>/dev/null)
    NEW_STRING=$(echo "$INPUT" | jq -r '.tool_input.new_string // ""' 2>/dev/null)
    CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // ""' 2>/dev/null)
    COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""' 2>/dev/null)

    # Record in NSM with full change data.
    # Truncate large content to 50KB to avoid payload limits.
    PAYLOAD=$(jq -n \
      --arg action "$TOOL_NAME" \
      --arg file_path "$FILE_PATH" \
      --arg tool_id "$TOOL_ID" \
      --arg old_string "${OLD_STRING:0:51200}" \
      --arg new_string "${NEW_STRING:0:51200}" \
      --arg content "${CONTENT:0:51200}" \
      --arg command "${COMMAND:0:4096}" \
      '{action: $action, file_path: $file_path, tool_id: $tool_id,
        old_string: $old_string, new_string: $new_string,
        content: $content, command: $command}' 2>/dev/null)

    nsm_post "record-action" "$PAYLOAD" >/dev/null 2>&1 &

    # Attach evidence to FRAME task (file changes)
    ACTIVE_TASK=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null | tr -d '[:space:]')
    if [ -n "$ACTIVE_TASK" ] && [ -n "$FILE_PATH" ] && { [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; }; then
      EV_PAYLOAD=$(jq -n --arg type "file_change" --arg tool "$TOOL_NAME" --arg file "$FILE_PATH" \
        '{type: $type, data: {tool: $tool, file: $file}, timestamp: (now | todate)}' 2>/dev/null)
      if [ -n "$EV_PAYLOAD" ]; then
        curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
          -d "$EV_PAYLOAD" "$HUB_URL/api/v1/frame/items/$ACTIVE_TASK/evidence" >/dev/null 2>&1 &
      fi
    fi

    # Delegate capture to existing hook
    if [ -f "hooks/codewitness-hook.sh" ]; then
      echo "$INPUT" | NEXUS_BINARY="${NEXUS_BINARY:-./nexus}" hooks/codewitness-hook.sh capture
    fi

    # CW-1028 fix: auto-complete build artifact substeps after Write/Edit on .go files.
    # Runs go vet + simple checks in background, POSTs evidence to NSM.
    if { [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; } && echo "$FILE_PATH" | grep -qE '\.go$'; then
      (
        # files_modified is trivially true if we got here
        nsm_post "substep-from-evidence" '{"substep_id":"files_modified","source":"build_artifact","agent":"post_tool_hook"}' >/dev/null 2>&1

        # Run go vet on the package containing the modified file
        PKG_DIR=$(dirname "$FILE_PATH")
        if (cd "$PKG_DIR" && go vet . 2>/dev/null); then
          nsm_post "substep-from-evidence" '{"substep_id":"go_vet_pass","source":"build_artifact","agent":"post_tool_hook"}' >/dev/null 2>&1
        fi

        # Check for hardcoded secrets (basic grep patterns)
        if ! grep -qE '(password|secret|api[_-]?key|token)\s*[:=]\s*"[^"]{8,}"' "$FILE_PATH" 2>/dev/null; then
          nsm_post "substep-from-evidence" '{"substep_id":"no_secrets","source":"build_artifact","agent":"post_tool_hook"}' >/dev/null 2>&1
        fi

        # Check for SQL string concatenation (Sprintf with SELECT/INSERT/UPDATE/DELETE)
        if ! grep -qE 'fmt\.Sprintf\s*\(\s*"(SELECT|INSERT|UPDATE|DELETE)' "$FILE_PATH" 2>/dev/null; then
          nsm_post "substep-from-evidence" '{"substep_id":"sql_parameterized","source":"build_artifact","agent":"post_tool_hook"}' >/dev/null 2>&1
        fi
      ) &
    fi

    exit 0
    ;;

  stop)
    # Stop hook — ALWAYS allow stop to prevent feedback loop.
    # Blocking stop causes the LLM to respond, which triggers stop again → infinite loop.
    # Incomplete substeps are enforced at pre_tool time, not at stop.
    # FAIL-OPEN: server unreachable → allow stop.
    STATE=$(nsm_query "state")
    if [ -z "$STATE" ]; then
      exit 0
    fi
    CURRENT=$(echo "$STATE" | jq -r '.state // "idle"' 2>/dev/null)
    REMAINING=$(echo "$STATE" | jq -r '.remaining_substeps // [] | join(", ")' 2>/dev/null)
    if [ -n "$REMAINING" ] && { [ "$CURRENT" = "implement" ] || [ "$CURRENT" = "test" ]; }; then
      # Log the gap but DO NOT block — just warn.
      echo "$(date -Iseconds) NSM STOP: $CURRENT has incomplete substeps: $REMAINING" >> "$LOGFILE"
    fi
    exit 0
    ;;

  task_complete)
    # TaskCompleted: run deterministic gate before allowing completion.
    RESULT=$(nsm_post "gate-check" "{}")

    # FAIL-OPEN: server unreachable → allow task completion, log gap.
    if [ -z "$RESULT" ]; then
      echo "$(date -Iseconds) NSM OFFLINE: allowing task_complete (server unreachable)" >> "$LOGFILE"
      exit 0
    fi

    ALL_PASS=$(echo "$RESULT" | jq -r '.all_pass // false' 2>/dev/null)

    if [ "$ALL_PASS" != "true" ]; then
      FAILED=$(echo "$RESULT" | jq -r '[.checks[] | select(.passed == false)] | map(.name) | join(", ")' 2>/dev/null)
      echo "NSM Gate FAILED: $FAILED"
      exit 2  # Block task completion
    fi
    exit 0
    ;;

  config_change)
    # ConfigChange: ALWAYS block settings modification.
    echo "NSM: Settings modification blocked — enforcement configuration is protected"
    exit 2
    ;;

  subagent_start)
    # SubagentStart: record agent evidence — which agent started, for what task.
    AGENT_NAME=$(echo "$INPUT" | jq -r '.agent_name // .agent_type // ""' 2>/dev/null)
    ACTIVE_TASK=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null | tr -d '[:space:]')
    ACTIVE_PRISM=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-prism-session" 2>/dev/null | tr -d '[:space:]')
    TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

    # Record subagent start as evidence on the control plane
    if [ -n "$ACTIVE_TASK" ] && [ -n "$AGENT_NAME" ]; then
      nsm_post "record-action" "{\"action\":\"Agent\",\"file_path\":\"subagent:${AGENT_NAME}\",\"command\":\"start\"}" >/dev/null 2>&1 &

      # Record in FRAME as evidence
      curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
        -d "{\"type\":\"subagent_start\",\"data\":{\"agent\":\"${AGENT_NAME}\",\"task\":\"${ACTIVE_TASK}\",\"timestamp\":\"${TIMESTAMP}\"}}" \
        "$HUB_URL/api/v1/frame/items/$ACTIVE_TASK/evidence" >/dev/null 2>&1 &
    fi

    echo "$(date -Iseconds) SUBAGENT START: agent=$AGENT_NAME task=$ACTIVE_TASK" >> "$LOGFILE"
    exit 0
    ;;

  subagent_stop)
    # SubagentStop: record agent completion — THIS IS THE EVIDENCE that an agent actually ran.
    # The control plane uses this to auto-complete review substeps.
    AGENT_NAME=$(echo "$INPUT" | jq -r '.agent_name // .agent_type // ""' 2>/dev/null)
    ACTIVE_TASK=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-task" 2>/dev/null | tr -d '[:space:]')
    ACTIVE_PRISM=$(cat "${NEXUS_DATA_DIR:-.nexus}/active-prism-session" 2>/dev/null | tr -d '[:space:]')
    TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

    # Record subagent completion as evidence
    if [ -n "$ACTIVE_TASK" ] && [ -n "$AGENT_NAME" ]; then
      # POST to control plane: subagent evidence (immutable)
      curl -s --max-time 3 -X POST -H "$AUTH" -H "Content-Type: application/json" \
        -d "{\"type\":\"subagent_complete\",\"data\":{\"agent\":\"${AGENT_NAME}\",\"task\":\"${ACTIVE_TASK}\",\"prism_session\":\"${ACTIVE_PRISM}\",\"timestamp\":\"${TIMESTAMP}\"}}" \
        "$HUB_URL/api/v1/frame/items/$ACTIVE_TASK/evidence" >/dev/null 2>&1

      # Auto-complete review substeps based on agent role
      # The CONTROL PLANE decides if this evidence satisfies a substep — not the AI.
      AGENT_LOWER=$(echo "$AGENT_NAME" | tr '[:upper:]' '[:lower:]')
      case "$AGENT_LOWER" in
        guardian*|security*)
          curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
            -d "{\"substep_id\":\"security_review\",\"source\":\"subagent_evidence\",\"agent\":\"${AGENT_NAME}\"}" \
            "$HUB_URL/api/v1/nsm/substep-from-evidence" >/dev/null 2>&1 ;;
        sentinel*|quality*|reviewer*)
          curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
            -d "{\"substep_id\":\"quality_review\",\"source\":\"subagent_evidence\",\"agent\":\"${AGENT_NAME}\"}" \
            "$HUB_URL/api/v1/nsm/substep-from-evidence" >/dev/null 2>&1 ;;
        warden*|compliance*)
          curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
            -d "{\"substep_id\":\"compliance_review\",\"source\":\"subagent_evidence\",\"agent\":\"${AGENT_NAME}\"}" \
            "$HUB_URL/api/v1/nsm/substep-from-evidence" >/dev/null 2>&1 ;;
      esac

      # Record PRISM finding from agent evidence (server derives author)
      if [ -n "$ACTIVE_PRISM" ]; then
        curl -s --max-time 2 -X POST -H "$AUTH" -H "Content-Type: application/json" \
          -d "{\"agent_name\":\"${AGENT_NAME}\",\"task_key\":\"${ACTIVE_TASK}\",\"source\":\"subagent_stop\"}" \
          "$HUB_URL/api/v1/prism/session/$ACTIVE_PRISM/agent-evidence" >/dev/null 2>&1 &
      fi
    fi

    echo "$(date -Iseconds) SUBAGENT STOP: agent=$AGENT_NAME task=$ACTIVE_TASK" >> "$LOGFILE"
    exit 0
    ;;

  post_compact)
    # PostCompact: re-inject NSM state after context compaction.
    STATE=$(nsm_query "state")
    CURRENT=$(echo "$STATE" | jq -r '.state // "idle"' 2>/dev/null)
    TASK=$(echo "$STATE" | jq -r '.task_key // ""' 2>/dev/null)
    REMAINING=$(echo "$STATE" | jq -r '.remaining_substeps // [] | join(", ")' 2>/dev/null)

    echo "[NSM RESTORED] State: $CURRENT | Task: $TASK | Remaining: ${REMAINING:-none}"
    exit 0
    ;;

  *)
    echo "Unknown hook type: $HOOK_TYPE" >> "$LOGFILE"
    exit 0
    ;;
esac
