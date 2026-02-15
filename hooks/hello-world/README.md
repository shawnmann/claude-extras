# hello-world hook

A minimal "start here" hook that logs the JSON it receives from Claude Code. It doesn't block or modify anything — just shows you what data hooks get.

## What it does

1. Captures the JSON that Claude Code sends via stdin
2. Pretty-prints it (if `jq` is installed) and appends it to a log file
3. Exits 0 (allow the action to proceed)

## Files

| File | Purpose |
|------|---------|
| `hook.sh` | The hook script |
| `settings-example.json` | Config snippet to copy into `.claude/settings.json` |

## Setup

1. Make the script executable:
   ```bash
   chmod +x hooks/hello-world/hook.sh
   ```

2. Copy the contents of `settings-example.json` into your project's `.claude/settings.json` (or merge it with existing hooks config).

3. Start a Claude Code session and use any tool. The hook will fire on every tool call.

4. Check the log:
   ```bash
   cat /tmp/claude-hook-hello-world.log
   ```

## What you'll see

Each log entry looks something like:

```json
{
  "session_id": "abc123",
  "cwd": "/your/project",
  "hook_event_name": "PreToolUse",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/some/file.txt"
  }
}
```

## Next steps

- Change the `matcher` in settings to filter specific tools (e.g., `"Bash"`, `"Edit|Write"`)
- Try returning exit code 2 to block a tool call (stderr is shown to Claude as feedback)
- Swap `PreToolUse` for other events like `PostToolUse` or `Notification`
