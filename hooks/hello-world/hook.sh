#!/bin/bash
# hello-world hook — logs the JSON input it receives from Claude Code
# Event: PreToolUse | Matcher: .* (all tools)
# This hook does not block anything — it just logs for learning purposes.

INPUT=$(cat)

LOG_FILE="/tmp/claude-hook-hello-world.log"

echo "--- $(date -Iseconds) ---" >> "$LOG_FILE"
echo "$INPUT" | jq . >> "$LOG_FILE" 2>/dev/null || echo "$INPUT" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

exit 0
