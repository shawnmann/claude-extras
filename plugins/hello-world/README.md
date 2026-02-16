# hello-world plugin

A minimal "start here" plugin that registers a single greeting command. It doesn't do anything complex — just shows you the plugin structure and how namespaced commands work.

## What it does

1. Registers the `/hello-world:hello` slash command
2. Greets the user and asks how it can help

## Files

| File | Purpose |
|------|---------|
| `.claude-plugin/plugin.json` | Plugin manifest (name, description, version) |
| `commands/hello/SKILL.md` | The greeting command |

## Setup

1. Load the plugin locally:
   ```
   claude --plugin-dir ./plugins/hello-world
   ```

2. Type `/` and look for `hello-world:hello` in the autocomplete list.

## Usage

```
/hello-world:hello
```

## Next steps

- Add more commands by creating new directories under `commands/`
- Add agents, hooks, or MCP servers to the plugin directory
- See the [plugin docs](https://code.claude.com/docs/en/plugins) for the full plugin structure
