---
name: commit-message
description: Generate a conventional commit message from staged changes
allowed-tools: Bash
---

Generate a commit message for the currently staged changes.

Steps:

1. Run `git diff --staged` to see what's staged. If nothing is staged, tell the user and stop.
2. Analyze the changes — what was added, modified, or removed and why.
3. Write a commit message following the Conventional Commits format:
   ```
   <type>(<scope>): <short summary>

   <optional body explaining the "why">
   ```
4. Use the appropriate type: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `build`, `ci`.

If $ARGUMENTS is provided, treat it as hints about the type or scope (e.g., `fix auth` means it's a fix in the auth scope).

Output only the commit message — no extra commentary. The user can then copy it or ask you to commit with it.
