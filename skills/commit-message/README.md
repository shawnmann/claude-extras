# commit-message skill

Generates a conventional commit message by inspecting your staged changes with `git diff --staged`.

## What it does

1. Runs `git diff --staged` to read the staged changes
2. Analyzes what changed and why
3. Outputs a commit message in Conventional Commits format

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | The skill file (Markdown + YAML frontmatter) |

## Setup

1. Copy this directory to your skills folder:
   ```powershell
   Copy-Item -Recurse skills\commit-message .claude\skills\commit-message
   ```

2. Stage some changes (`git add ...`) and type `/commit-message`.

## Usage

```
/commit-message
/commit-message fix auth
/commit-message feat(api)
```

Arguments are optional hints about the commit type or scope.

## Customization

- Edit the type list in `SKILL.md` to match your project's conventions
- Add a body template or footer format (e.g., issue references)
- Change the output to automatically run `git commit` instead of just printing the message
