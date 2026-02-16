# Skills

Claude Code skills (slash commands) — sample skills and notes on building your own.

## Documentation

- [Claude Code Skills](https://docs.anthropic.com/en/docs/claude-code/skills)

## Skills in a Nutshell

Skills are Markdown files that teach Claude how to handle specific tasks. Unlike hooks (which are shell scripts that run deterministically), skills are **prompts** — they guide Claude's behavior when invoked.

### How they work

1. You create a `SKILL.md` file with YAML frontmatter and Markdown instructions
2. You place it in `.claude/skills/<name>/` (project-level) or `~/.claude/skills/<name>/` (global)
3. You invoke it with `/<name>` in a Claude Code session, or Claude can pick it up automatically
4. The skill receives `$ARGUMENTS` — whatever text follows the slash command

### Frontmatter options

| Field | Purpose |
|-------|---------|
| `name` | Slash command name (e.g., `commit-message` → `/commit-message`) |
| `description` | Short description shown in autocomplete |
| `allowed-tools` | Tools the skill can use (e.g., `Bash`, `Read`, `Glob`) |

## How to install a skill

Each sample skill includes a `SKILL.md` (the skill itself) and a `README.md` (documentation).

1. **Copy the skill directory** to your project or global skills folder:
   ```powershell
   # Project-level (only this project)
   Copy-Item -Recurse skills\<skill-name> .claude\skills\<skill-name>

   # Global (all projects)
   Copy-Item -Recurse skills\<skill-name> ~\.claude\skills\<skill-name>
   ```

2. **Start a Claude Code session** and type `/` — your skill should appear in autocomplete.

3. **Invoke it** by typing `/<skill-name>` followed by any arguments.

## Sample Skills

| Skill | Slash Command | Description |
|-------|---------------|-------------|
| [Hello world](hello-world/) | `/hello-world` | Simple starter skill that greets the user |
| [Commit message](commit-message/) | `/commit-message` | Generate a conventional commit message from staged changes |
| [Explain code](explain-code/) | `/explain-code` | Explain a file or function with analogies and diagrams |
| [Review PR](review-pr/) | `/review-pr` | Review a GitHub PR with structured feedback |
