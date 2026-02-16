# writing-assistant MCP server

An MCP server that demonstrates prompt templates — reusable, parameterized message sequences that clients can invoke. Includes a single-message prompt with an optional enum and a multi-message prompt with a system-style preamble.

## What it does

1. Exposes a `summarize` prompt with an optional `style` enum (brief, detailed, bullet-points)
2. Exposes a `code_review` prompt that constructs a multi-part review request with a system-style preamble
3. Shows how to use `z.enum()` and `z.optional()` to define prompt arguments

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Server source — registers two prompt templates |
| `package.json` | Dependencies (`@modelcontextprotocol/sdk`, `zod`) |
| `tsconfig.json` | TypeScript config — compiles to `./build/` |

## Prompts

| Prompt | Args | Description |
|--------|------|-------------|
| `summarize` | `text`, `style?` | Summarize text in a given style (brief, detailed, or bullet-points) |
| `code_review` | `code`, `language?` | Review code for bugs, style, performance, and security |

## Setup

1. Install dependencies and build:
   ```powershell
   Set-Location mcp/prompts
   npm install
   npm run build
   ```

2. Add to your project's `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "writing-assistant": {
         "command": "node",
         "args": ["mcp/prompts/build/index.js"]
       }
     }
   }
   ```

3. Restart Claude Code. The server should appear in `/mcp`.

## Usage

Prompts are templates that expand into messages. In clients that support prompt selection, you can pick them from a list. In Claude Code, they're available as context:

```
Summarize this text in bullet points: "MCP servers expose tools, resources, and prompts..."

Review this Python code for bugs: def add(a, b): return a - b
```

## Next steps

- Add prompts for other tasks (writing emails, generating test cases, etc.)
- Use `z.enum()` to constrain arguments to valid options
- Combine prompts with tools — let the prompt set up context, then call a tool for action
