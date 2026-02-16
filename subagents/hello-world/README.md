# hello-world subagent

A minimal "start here" subagent that greets the user. It doesn't do anything complex — just shows you the subagent format and how delegation works.

## What it does

1. Gets delegated to by Claude when a greeting or hello-world demo is requested
2. Greets the user warmly
3. Briefly describes what subagents are

## Files

| File | Purpose |
|------|---------|
| `hello-world.md` | Subagent definition (frontmatter + system prompt) |

## Setup

1. Copy the subagent definition to your agents directory:
   ```
   cp hello-world.md .claude/agents/hello-world.md
   ```

2. Restart your Claude Code session.

## Usage

Ask Claude to use the hello-world subagent:

```
Use the hello-world subagent to greet me
```

## Next steps

- Add `tools` to the frontmatter to restrict which tools the subagent can access
- Change `model` to route to different models (e.g., `sonnet`, `opus`)
- Create a specialized subagent for a real task like code review, testing, or documentation
