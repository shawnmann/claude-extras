# explain-code skill

Explains a file, function, or class with a structured breakdown including analogies, ASCII diagrams, and a step-by-step walkthrough.

## What it does

1. Locates the target code using `Read`, `Grep`, and `Glob`
2. Produces a structured explanation:
   - One-line summary
   - Real-world analogy
   - ASCII diagram of the flow or structure
   - Step-by-step walkthrough
   - Gotchas and surprises

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | The skill file (Markdown + YAML frontmatter) |

## Setup

1. Copy this directory to your skills folder:
   ```powershell
   Copy-Item -Recurse skills\explain-code .claude\skills\explain-code
   ```

2. Type `/explain-code <target>` in a Claude Code session.

## Usage

```
/explain-code src/auth/login.ts
/explain-code handleSubmit
/explain-code DatabaseConnection
```

## Customization

- Adjust the explanation structure in `SKILL.md` (e.g., remove the analogy section, add a "related code" section)
- Add `Bash` to `allowed-tools` if you want the skill to run tests or check types as part of the explanation
