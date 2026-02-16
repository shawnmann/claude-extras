# Hooks

Claude Code hooks — sample hooks and notes on the hook system.

## Documentation

- [Claude Code Hooks](https://claude.ai/docs/hooks)

## Hooks in a Nutshell

Hooks are shell commands that run automatically at specific points in Claude Code's lifecycle. Unlike prompting Claude to do something (which it might skip), hooks are **deterministic** — they always fire when the event occurs.

### How they work

1. You configure hooks in `.claude/settings.json` (project) or `~/.claude/settings.json` (global)
2. You pick an **event** (e.g., `PreToolUse`, `PostToolUse`, `Notification`)
3. You provide a **matcher** (regex to filter which tools/events trigger it)
4. Your hook receives JSON on **stdin** (standard input stream) with context (tool name, input, file paths, etc.)
5. It communicates back via **exit codes** — exit 0 to allow, exit 2 to block

### Key events

| Event | When it fires | Can block? |
|-------|---------------|------------|
| `PreToolUse` | Before a tool executes | Yes |
| `PostToolUse` | After a tool succeeds | No |
| `Notification` | Claude needs attention | No |
| `SessionStart` | Session begins or resumes | No |
| `Stop` | Claude finishes responding | Yes |

## How to enable a hook

Each sample hook includes a `settings-example.json` with the config snippet you need. To enable a hook:

1. **Add the hook config** to your project's `.claude/settings.json`. Copy the contents of the hook's `settings-example.json` into it. If the file doesn't exist yet, create `.claude/settings.json` with the snippet. If it already exists, merge the new hook entry into the existing `hooks` object.

2. **Restart your Claude Code session** so it picks up the new settings.

That's it — the hook will now fire automatically whenever its event triggers.

> **Note:** The sample hooks in this repo are written for **PowerShell** (Windows). The concepts apply to any shell — just swap the script for a bash equivalent if you're on macOS/Linux.

## Sample Hooks

| Hook | Event | Pattern |
|------|-------|---------|
| [Hello world](hello-world/) | `PreToolUse` | Log all tool calls to a file (starter hook) |
| [Protect sensitive files](protect-sensitive-files/) | `PreToolUse` | Block edits to `.env`, lock files, etc. |
| [Auto-format after edits](auto-format/) | `PostToolUse` | Run a formatter on any file Claude writes |
| [Desktop notification](desktop-notification/) | `Notification` | Toast when Claude needs input |
