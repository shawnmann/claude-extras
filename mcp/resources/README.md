# project-info MCP server

An MCP server that demonstrates resources — read-only data that clients can fetch. Includes static resources with fixed URIs and a dynamic resource template with URI parameters.

## What it does

1. Exposes two static resources (`config://project`, `config://guidelines`) with hardcoded project data
2. Exposes a dynamic resource template (`team://{memberId}/profile`) that resolves member IDs to profiles
3. Shows how to use `ResourceTemplate` with a `list` callback so clients can discover available resources

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Server source — registers static resources and a resource template |
| `package.json` | Dependencies (`@modelcontextprotocol/sdk`, `zod`) |
| `tsconfig.json` | TypeScript config — compiles to `./build/` |

## Resources

| URI | Type | Description |
|-----|------|-------------|
| `config://project` | Static | Project metadata (name, version, language) |
| `config://guidelines` | Static | Coding guidelines as plain text |
| `team://{memberId}/profile` | Template | Team member profile by ID (alice, bob, carol) |

## Setup

1. Install dependencies and build:
   ```powershell
   Set-Location mcp/resources
   npm install
   npm run build
   ```

2. Add to your project's `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "project-info": {
         "command": "node",
         "args": ["mcp/resources/build/index.js"]
       }
     }
   }
   ```

3. Restart Claude Code. The server should appear in `/mcp`.

## Usage

Resources are read-only data that Claude can access when needed:

```
What are this project's coding guidelines?

Show me Alice's team member profile

What language is this project written in?
```

## Next steps

- Add your own static resources for project-specific data
- Create resource templates backed by file system reads or database queries
- Combine resources with tools — expose data via resources, actions via tools
