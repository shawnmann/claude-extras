# Subagents

Claude Code subagents — sample subagents and notes on the subagent system.

## Documentation

- [Claude Code Sub-agents](https://code.claude.com/docs/en/sub-agents)

## Subagents in a Nutshell

Subagents are specialized AI assistants that run in their own isolated context window within Claude Code. Unlike skills which run in the main conversation, subagents work independently — they get their own system prompt, tool access, and can even use a different model. Claude delegates tasks to them automatically (based on the subagent's description) or when the user asks.

### How they work

1. You create a `.md` file with YAML frontmatter (name, description, tools, model) and a system prompt in the body
2. You place it in `.claude/agents/` (project) or `~/.claude/agents/` (global)
3. Claude delegates tasks to the subagent based on its description — automatically or when asked
4. The subagent works independently in its own context window and returns results to the main conversation

### Frontmatter options

| Field | Description |
|-------|-------------|
| `name` | The subagent's name (used to reference it) |
| `description` | What the subagent does — Claude uses this to decide when to delegate |
| `tools` | List of tools the subagent can access (e.g., `Bash`, `Read`, `Edit`) |
| `model` | Which model to use (e.g., `haiku`, `sonnet`, `opus`) |
| `maxTurns` | Maximum number of agentic turns before the subagent stops |
| `permissionMode` | Permission mode for the subagent's tool use |

### Built-in subagents

Claude Code includes several built-in subagents:

| Subagent | Purpose |
|----------|---------|
| **Explore** | Codebase exploration — reads 8+ files across multiple directories |
| **Plan** | Software architecture — designs implementation plans and identifies critical files |
| **general-purpose** | Research and multi-step tasks — searching, reading, and executing |
| **Bash** | Command execution — runs bash commands for git, builds, and terminal tasks |

## How to install a subagent

1. **Copy the `.md` file** to your project's `.claude/agents/` directory (for project-scoped agents) or `~/.claude/agents/` (for global agents). Create the directory if it doesn't exist.

2. **Restart your Claude Code session** so it picks up the new agent definition.

That's it — Claude will now delegate to the subagent when appropriate, or you can ask it to directly.

## Sample Subagents

| Subagent | Description |
|----------|-------------|
| [hello-world](hello-world/) | Minimal starter subagent with a friendly greeting |
