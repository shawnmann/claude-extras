# Plugins

Claude Code plugins — sample plugins and notes on the plugin system.

## Documentation

- [Claude Code Plugins](https://code.claude.com/docs/en/plugins)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference)
- [Official Plugin Examples](https://github.com/anthropics/claude-code/tree/main/plugins)

## Plugins in a Nutshell

Plugins are reusable, shareable packages that bundle skills, agents, hooks, and MCP servers into a single distributable unit. Unlike configuring these pieces individually in `.claude/`, plugins package everything together with a manifest so they can be installed, versioned, and shared across projects and teams.

### How they work

1. You create a `.claude-plugin/plugin.json` manifest with the plugin's name, description, and version
2. You add commands (slash commands), agents, hooks, or MCP servers inside the plugin directory
3. Users install the plugin or load it locally with `--plugin-dir`
4. All plugin commands are namespaced — e.g., a `hello` command in the `hello-world` plugin becomes `/hello-world:hello`

### Key concepts

| Concept | Description |
|---------|-------------|
| **Manifest** | `.claude-plugin/plugin.json` — declares plugin name, version, and metadata |
| **Namespacing** | All commands are prefixed with the plugin name (e.g., `/plugin-name:command`) |
| **Commands** | Slash commands defined as `SKILL.md` files under `commands/<name>/` |
| **Agents** | Agent definitions bundled inside the plugin |
| **Hooks** | Hook scripts that activate when the plugin is installed |
| **MCP Servers** | MCP servers that start when the plugin is loaded |

## How to install/test a plugin

1. **Local testing** — point Claude Code at the plugin directory:
   ```
   claude --plugin-dir ./plugins/hello-world
   ```

2. **Verify it loaded** — type `/` and look for the plugin's namespaced commands (e.g., `/hello-world:hello`).

3. **Install for regular use** — use the install command:
   ```
   /plugin install <path-or-url>
   ```

## Sample Plugins

| Plugin | Description |
|--------|-------------|
| [hello-world](hello-world/) | Minimal starter plugin with a single greeting command |
