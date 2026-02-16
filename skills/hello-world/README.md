# hello-world skill

A minimal "start here" skill that greets the user. It doesn't do anything complex — just shows you the skill format and how `$ARGUMENTS` works.

## What it does

1. Greets the user
2. Mentions the current project directory
3. Offers a few suggestions for things Claude can help with

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | The skill file (Markdown + YAML frontmatter) |

## Setup

1. Copy this directory to your skills folder:
   ```powershell
   Copy-Item -Recurse skills\hello-world .claude\skills\hello-world
   ```

2. Start a Claude Code session and type `/hello-world`.

## Usage

```
/hello-world
/hello-world Alice
```

## Next steps

- Change the instructions in `SKILL.md` to customize the greeting
- Add `allowed-tools` to the frontmatter to let the skill use tools
- Try creating your own skill from scratch using this as a template
