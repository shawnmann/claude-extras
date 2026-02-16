# MCP

Sample MCP (Model Context Protocol) servers for Claude Code — each one teaches a single MCP concept with minimal code.

## Documentation

- [MCP specification](https://modelcontextprotocol.io)
- [Claude Code MCP servers](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## MCP in a Nutshell

MCP servers are standalone programs that expose capabilities to AI clients over a standard protocol. Unlike hooks (which are shell scripts triggered by events) or skills (which are prompt templates), MCP servers are **long-running processes** that communicate via JSON-RPC over stdio.

### How they work

1. You build and configure an MCP server in `.mcp.json` (project) or `~/.claude/settings.json` (global)
2. Claude Code launches the server as a child process and connects via stdio
3. The server advertises its capabilities — **tools**, **resources**, and/or **prompts**
4. Claude calls those capabilities as needed during the conversation

### Key concepts

| Concept | What it is | Example |
|---------|-----------|---------|
| **Tool** | A function the LLM can call (with user approval) | `word_count`, `slugify` |
| **Resource** | Read-only data the client can fetch | `config://project`, `team://alice/profile` |
| **Prompt** | A reusable message template with parameters | `summarize`, `code_review` |
| **Transport** | How client and server communicate | stdio (local), HTTP (remote) |

## How to install a server

Each sample server is self-contained. To install one:

1. **Install dependencies and build:**
   ```powershell
   Set-Location mcp/<server>
   npm install
   npm run build
   ```

2. **Add to your project's `.mcp.json`** (create it at the project root if it doesn't exist):
   ```json
   {
     "mcpServers": {
       "<server-name>": {
         "command": "node",
         "args": ["mcp/<server>/build/index.js"]
       }
     }
   }
   ```

3. **Restart Claude Code** so it picks up the new server.

4. **Verify** by running `/mcp` — the server should appear in the list.

## Sample Servers

| Server | Directory | Concept | What it demonstrates |
|--------|-----------|---------|---------------------|
| [hello-world](hello-world/) | `mcp/hello-world/` | Skeleton | Minimal MCP setup — one `greet` tool (~25 lines) |
| [string-utils](tools/) | `mcp/tools/` | Tools | Multiple tools, optional params, Zod schemas |
| [project-info](resources/) | `mcp/resources/` | Resources | Static resources + dynamic resource templates |
| [writing-assistant](prompts/) | `mcp/prompts/` | Prompts | Prompt templates with optional enum and multi-message |
