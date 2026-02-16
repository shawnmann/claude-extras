# protect-sensitive-files hook

A PreToolUse hook that blocks Claude Code from editing `.env` files. Any attempt to use the `Edit` or `Write` tool on a file matching `.env` patterns (`.env`, `.env.local`, `.env.production`, etc.) is rejected with an explanation.

## What it does

1. Intercepts `Edit` and `Write` tool calls before they execute
2. Checks whether the target file path matches a `.env` pattern
3. If it matches: exits 2 to block the action and writes a reason to stderr
4. If it doesn't match: exits 0 to allow the action

## Files

| File | Purpose |
|------|---------|
| `hook.ps1` | PowerShell hook script |
| `settings-example.json` | Config snippet to add to your `.claude/settings.json` |

## Setup

1. Copy the contents of `settings-example.json` into your project's `.claude/settings.json` (or merge it with existing hooks config).

2. Start a Claude Code session and try editing a `.env` file. The hook will block it.

3. Editing any other file works normally — the hook only targets `.env` patterns.

## What happens when blocked

When Claude tries to edit a protected file, the hook:

- Exits with code 2 (which tells Claude Code to block the tool call)
- Writes a message to stderr explaining why (Claude sees this as feedback)

Claude will see something like:

```
Blocked: editing '/path/to/.env.local' is not allowed. Files matching .env patterns are protected by the protect-sensitive-files hook.
```

## Customizing protected patterns

The regex pattern in `hook.ps1` is:

```powershell
$FilePath -match '\.env($|\..+)'
```

This matches any file path ending in `.env` or `.env.<anything>`. To protect additional files, modify the regex. For example, to also block lock files:

```powershell
$FilePath -match '(\.env($|\..+)|package-lock\.json|yarn\.lock)'
```

## Note on file paths

Use a relative path (e.g., `./hooks/protect-sensitive-files/hook.ps1`) in your settings command rather than `$CLAUDE_PROJECT_DIR`. Claude Code runs hooks from the project's working directory, so relative paths resolve correctly. Environment variables like `$CLAUDE_PROJECT_DIR` may not expand properly in the command string and can cause the hook to silently fail.
