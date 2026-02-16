# review-pr skill

Reviews a GitHub pull request with structured feedback covering correctness, security, and maintainability.

## What it does

1. Fetches the PR diff and metadata using `gh` CLI
2. Reads relevant files for additional context
3. Produces a structured review:
   - Summary of the PR
   - Key changes by area
   - Issues found (with severity, location, and fix suggestions)
   - Verdict (approve / request changes / comment)

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | The skill file (Markdown + YAML frontmatter) |

## Prerequisites

- [GitHub CLI (`gh`)](https://cli.github.com/) installed and authenticated

## Setup

1. Copy this directory to your skills folder:
   ```powershell
   Copy-Item -Recurse skills\review-pr .claude\skills\review-pr
   ```

2. Type `/review-pr <number>` in a Claude Code session.

## Usage

```
/review-pr 42
/review-pr https://github.com/owner/repo/pull/42
```

## Customization

- Adjust severity categories or add your own (e.g., `performance`, `accessibility`)
- Add project-specific review criteria (e.g., "all new endpoints must have tests")
- Change the verdict options to match your team's review workflow
