# hello-world MCP server

A minimal "start here" MCP server that exposes a single `greet` tool. It doesn't do anything complex — just shows the bare-minimum setup for a working MCP server.

## What it does

1. Creates an MCP server with stdio transport
2. Registers one tool (`greet`) that takes a name and returns a greeting
3. Demonstrates the basic MCP server lifecycle: create, register, connect

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Server source — creates the server and registers the `greet` tool |
| `package.json` | Dependencies (`@modelcontextprotocol/sdk`, `zod`) |
| `tsconfig.json` | TypeScript config — compiles to `./build/` |

## Setup

1. Install dependencies and build:
   ```powershell
   Set-Location mcp/hello-world
   npm install
   npm run build
   ```

2. Add to your project's `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "hello-world": {
         "command": "node",
         "args": ["mcp/hello-world/build/index.js"]
       }
     }
   }
   ```

3. Restart Claude Code. The server should appear in `/mcp`.

## Usage

Ask Claude to greet someone:

```
Say hello to Alice using the greet tool
```

Claude will call the `greet` tool with `{ "name": "Alice" }` and get back `"Hello, Alice!"`.

## Next steps

- Add more tools to the server (see the [tools](../tools/) sample)
- Add resources to expose read-only data (see the [resources](../resources/) sample)
- Add prompt templates (see the [prompts](../prompts/) sample)
