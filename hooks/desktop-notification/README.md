# desktop-notification hook

A Notification hook that shows a Windows toast when Claude Code needs your attention. Useful when you switch away from the terminal while Claude works on a long task.

## What it does

1. Fires on any `Notification` event from Claude Code
2. Extracts the notification message from the JSON payload
3. Shows a Windows balloon-tip toast with the message
4. Exits — Notification hooks cannot block

## Files

| File | Purpose |
|------|---------|
| `hook.ps1` | PowerShell hook script |
| `settings-example.json` | Config snippet to add to your `.claude/settings.json` |

## Setup

1. Copy the contents of `settings-example.json` into your project's `.claude/settings.json` (or merge it with existing hooks config).

2. Start a Claude Code session. When Claude finishes a task and needs input, a toast notification will appear.

## What happens when it runs

When Claude sends a notification, the hook:

- Loads the `System.Windows.Forms` assembly (built into Windows)
- Creates a temporary `NotifyIcon` and calls `ShowBalloonTip` with the message
- Disposes the icon after a short delay so the toast has time to render

No external modules or dependencies are needed — it uses .NET APIs that ship with Windows.

## Note on file paths

Use a relative path (e.g., `./hooks/desktop-notification/hook.ps1`) in your settings command rather than `$CLAUDE_PROJECT_DIR`. Claude Code runs hooks from the project's working directory, so relative paths resolve correctly. Environment variables like `$CLAUDE_PROJECT_DIR` may not expand properly in the command string and can cause the hook to silently fail.
