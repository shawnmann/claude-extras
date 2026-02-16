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

## Understanding MCP Tools

MCP tools are one of the three core capabilities any MCP server can expose (alongside resources and prompts). A tool is a **function the LLM can call** — the server defines it with a name, description, and input schema, and the LLM invokes it during a conversation (with user approval). Any MCP server can register tools, and they always follow the same protocol.

Tools are the most common MCP capability. They're how you give an LLM the ability to *do things* — query a database, call an API, transform data, run calculations, etc.

### How tools work

1. **Registration** — the server registers tools with `server.registerTool()`, defining a name, description, and Zod input schema
2. **Discovery** — the client calls `tools/list` to see what tools the server offers
3. **Invocation** — the LLM decides to call a tool, the client sends `tools/call` with arguments, and the server returns a result

In Claude Code, tools appear alongside built-in tools. When Claude decides a tool is relevant, it calls it (after user approval) and uses the result to inform its response. Our `string-utils` server demonstrates this with three tools (`word_count`, `reverse_text`, `slugify`), but you could build tools for anything — file conversion, API calls, database queries, etc.

### Example: testing tools with the SDK

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["mcp/tools/build/index.js"],
  });
  const client = new Client({ name: "test-client", version: "1.0.0" });
  await client.connect(transport);

  // Discovery — list available tools
  const { tools } = await client.listTools();
  console.log("Available tools:", tools);
  // → [{ name: "word_count", ... }, { name: "reverse_text", ... }, { name: "slugify", ... }]

  // Invocation — call a tool with arguments
  const result = await client.callTool("slugify", {
    text: "My Blog Post Title",
    separator: "-",
  });
  console.log("Result:", result.content);
  // → [{ type: "text", text: "my-blog-post-title" }]

  await client.close();
}

main();
```

### The flow in Claude Code

```
Claude sees a user request like "count the words in this paragraph"
        ↓
Claude discovers the word_count tool via tools/list
        ↓
Claude calls word_count({ text: "..." }) — user approves
        ↓
Server runs the function and returns the count
        ↓
Claude uses the result in its response
```

## Understanding MCP Resources

MCP resources are one of the three core capabilities any MCP server can expose (alongside tools and prompts). A resource is **read-only data the client can fetch** — think of it as a REST-like endpoint that returns structured content. Any MCP server can register resources, and they always follow the same protocol.

Resources come in two flavors:
- **Static resources** — fixed URIs like `config://project` that always return the same kind of data
- **Resource templates** — parameterized URIs like `team://{memberId}/profile` that return data based on the parameter

### How resources work

1. **Registration** — the server registers resources with `server.registerResource()`, defining a name, URI (or URI template), and read handler
2. **Discovery** — the client calls `resources/list` to see available resources and `resources/templates/list` to see templates
3. **Retrieval** — the client calls `resources/read` with a URI to fetch the content

Resources are useful for exposing context that the LLM or client might need — project configuration, documentation, team info, database schemas, etc. Our `project-info` server demonstrates this with static resources (`config://project`, `config://guidelines`) and a dynamic template (`team://{memberId}/profile`), but you could expose anything — API docs, environment info, file metadata, etc.

### Example: testing resources with the SDK

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["mcp/resources/build/index.js"],
  });
  const client = new Client({ name: "test-client", version: "1.0.0" });
  await client.connect(transport);

  // Discovery — list available resources
  const { resources } = await client.listResources();
  console.log("Available resources:", resources);
  // → [{ uri: "config://project", name: "project-config", ... }, ...]

  // Retrieval — read a static resource
  const config = await client.readResource("config://project");
  console.log("Project config:", config.contents[0].text);
  // → { "name": "claude-extras", "version": "1.0.0", ... }

  // Retrieval — read a dynamic resource from a template
  const profile = await client.readResource("team://alice/profile");
  console.log("Alice:", profile.contents[0].text);
  // → { "name": "Alice", "role": "Tech Lead", "team": "Platform" }

  await client.close();
}

main();
```

### The flow in a real app

```
Your app needs project context for an LLM call
        ↓
Client calls resources/list to discover what's available
        ↓
Client calls resources/read with "config://guidelines"
        ↓
Server returns the guidelines text
        ↓
Your app includes it as context in the LLM conversation
```

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

## Understanding MCP Transports

Transports are **how the client and server communicate**. They're not a capability you register — they're the underlying communication layer that carries all the JSON-RPC messages for tools, resources, and prompts.

### Available transports

| Transport | How it works | When to use it |
|-----------|-------------|----------------|
| **stdio** | Client spawns the server as a child process; messages flow over stdin/stdout | Local servers — the default for Claude Code |
| **Streamable HTTP** | Server runs as an HTTP endpoint; client sends requests over HTTP with optional SSE streaming | Remote servers, shared infrastructure, multi-client setups |

### stdio (local)

This is what all the sample servers in this project use. The client launches the server process and communicates over stdin/stdout:

```typescript
// Server side
const transport = new StdioServerTransport();
await server.connect(transport);

// Client side (or configured in .mcp.json)
const transport = new StdioClientTransport({
  command: "node",
  args: ["mcp/hello-world/build/index.js"],
});
await client.connect(transport);
```

In `.mcp.json`, this looks like:
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

### Streamable HTTP (remote)

For servers that need to run remotely or serve multiple clients, MCP supports HTTP with SSE streaming. The server exposes an HTTP endpoint, and the client connects over the network:

```json
{
  "mcpServers": {
    "remote-server": {
      "type": "url",
      "url": "https://my-server.example.com/mcp"
    }
  }
}
```

This is useful when the server needs access to infrastructure the client can't reach (databases, internal APIs), or when you want a single server instance shared across multiple users.
