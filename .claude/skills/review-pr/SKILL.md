---
name: review-pr
description: Review a GitHub PR with structured feedback
allowed-tools: Bash, Read, Grep, Glob
---

Review the GitHub pull request specified in $ARGUMENTS.

Steps:

1. Run `gh pr diff $ARGUMENTS` to fetch the PR diff. If $ARGUMENTS is empty, ask the user for a PR number or URL.
2. Run `gh pr view $ARGUMENTS` to get the PR title, description, and metadata.
3. Read any files that need more context to understand the changes.
4. Provide a structured review:

### Summary
One paragraph summarizing what the PR does and why.

### Changes
Bulleted list of the key changes, grouped by area.

### Issues found
For each issue, include:
- **File and line**: where the issue is
- **Severity**: `critical` | `warning` | `nit`
- **Description**: what's wrong and why it matters
- **Suggestion**: how to fix it (with a code snippet if helpful)

If no issues are found, say so.

### Verdict
One of:
- **Approve** — looks good, no blocking issues
- **Request changes** — has critical or warning issues that should be addressed
- **Comment** — has nits or discussion points but nothing blocking

Be thorough but fair. Focus on correctness, security, and maintainability — not style preferences.
