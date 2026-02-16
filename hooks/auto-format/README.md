# auto-format hook

A PostToolUse hook that automatically runs Prettier on any file Claude Code edits or writes. Keeps formatting consistent without Claude needing to think about it.

## What it does

1. Intercepts `Edit` and `Write` tool calls after they execute
2. Checks whether the target file has a Prettier-supported extension
3. If supported: runs `npx prettier --write` on the file and reports to stderr
4. If not supported or Prettier fails: exits silently

## Supported extensions

`.js`, `.ts`, `.jsx`, `.tsx`, `.css`, `.scss`, `.html`, `.json`, `.md`, `.yaml`, `.yml`

## Files

| File | Purpose |
|------|---------|
| `hook.ps1` | PowerShell hook script |
| `settings-example.json` | Config snippet to add to your `.claude/settings.json` |

## Setup

1. Make sure Prettier is available in your project (`npm install --save-dev prettier`) or globally.

2. Copy the contents of `settings-example.json` into your project's `.claude/settings.json` (or merge it with existing hooks config).

3. Start a Claude Code session and edit a supported file. The hook will format it automatically.

## What happens when it runs

When Claude edits a supported file, the hook:

- Runs `npx prettier --write` on the file
- Writes a message to stderr so Claude sees the file was formatted (e.g., `Formatted src/index.js with Prettier.`)
- If the file type isn't supported or Prettier isn't installed, the hook exits silently

PostToolUse hooks cannot block tool calls, so even if something goes wrong the edit still applies.

## Customizing supported extensions

The extension list in `hook.ps1` is:

```powershell
$SupportedExtensions = @('.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.html', '.json', '.md', '.yaml', '.yml')
```

Add or remove extensions to match your project's needs.

## Note on file paths

Use a relative path (e.g., `./hooks/auto-format/hook.ps1`) in your settings command rather than `$CLAUDE_PROJECT_DIR`. Claude Code runs hooks from the project's working directory, so relative paths resolve correctly. Environment variables like `$CLAUDE_PROJECT_DIR` may not expand properly in the command string and can cause the hook to silently fail.
