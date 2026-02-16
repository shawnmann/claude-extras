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

## Understanding MCP Prompts

MCP prompts are one of the three core capabilities any MCP server can expose (alongside tools and resources). A prompt is a **reusable message template** — a saved recipe that returns pre-built messages for a client to send to an LLM. Any MCP server can register prompts, and they always follow the same protocol.

Unlike tools (which the LLM calls directly) and resources (which provide read-only data), prompts are designed for **client-side use** — the client retrieves them and decides what to do with the generated messages.

### How a client uses prompts

1. **Discovery** — the client calls `prompts/list` to see what prompts the server offers
2. **Retrieval** — the client calls `prompts/get` with a prompt name + arguments
3. **Usage** — the server returns pre-built messages that the client injects into a conversation

This is useful for building custom AI clients, IDE extensions, or chat UIs where you want consistent, reusable prompt templates. Our `writing-assistant` server demonstrates this with two example prompts (`summarize` and `code_review`), but you could build prompts for anything — SQL generation, email drafting, commit messages, etc.

### Example: testing prompts with the SDK

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // 1. Connect to the server (same way Claude Code does)
  const transport = new StdioClientTransport({
    command: "node",
    args: ["mcp/prompts/build/index.js"],
  });
  const client = new Client({ name: "test-client", version: "1.0.0" });
  await client.connect(transport);

  // 2. Discovery — list available prompts
  const { prompts } = await client.listPrompts();
  console.log("Available prompts:", prompts);
  // → [{ name: "summarize", ... }, { name: "code_review", ... }]

  // 3. Retrieval — get a prompt with arguments filled in
  const result = await client.getPrompt("summarize", {
    text: "MCP servers expose tools, resources, and prompts over JSON-RPC.",
    style: "bullet-points",
  });
  console.log("Generated messages:", JSON.stringify(result.messages, null, 2));
  // → [{ role: "user", content: { type: "text", text: "Summarize as a bulleted list..." } }]

  // 4. Pass these messages to an LLM API call
  //    e.g., anthropic.messages.create({ messages: result.messages, ... })

  await client.close();
}

main();
```

### The flow in a real app

```
User clicks "Summarize" in your UI
        ↓
Your app calls client.getPrompt("summarize", { text, style })
        ↓
Server returns pre-built messages with instructions baked in
        ↓
Your app sends those messages to Claude API → gets the summary
        ↓
Display result to user
```

The key value is **separation of concerns** — prompt logic lives in the MCP server and can be updated independently of the client app. Multiple clients (a web app, a CLI, an IDE plugin) can all reuse the same prompts without duplicating template logic.
