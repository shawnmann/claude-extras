# string-utils MCP server

An MCP server that demonstrates registering multiple tools with Zod input schemas, including optional parameters with defaults.

## What it does

1. Exposes three string-manipulation tools: `word_count`, `reverse_text`, and `slugify`
2. Shows how to define input schemas with `zod` — required params, optional params, and defaults
3. All logic is pure computation — no network calls, no side effects

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Server source — registers three tools with Zod schemas |
| `package.json` | Dependencies (`@modelcontextprotocol/sdk`, `zod`) |
| `tsconfig.json` | TypeScript config — compiles to `./build/` |

## Tools

| Tool | Params | Description |
|------|--------|-------------|
| `word_count` | `text` | Count the number of words |
| `reverse_text` | `text`, `by_word?` | Reverse characters (default) or word order |
| `slugify` | `text`, `separator?` | Convert to a URL-friendly slug |

## Setup

1. Install dependencies and build:
   ```powershell
   Set-Location mcp/tools
   npm install
   npm run build
   ```

2. Add to your project's `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "string-utils": {
         "command": "node",
         "args": ["mcp/tools/build/index.js"]
       }
     }
   }
   ```

3. Restart Claude Code. The server should appear in `/mcp`.

## Usage

```
How many words are in "The quick brown fox jumps over the lazy dog"?

Reverse the text "Hello, World!" by word order

Slugify "My Blog Post Title!" with underscores
```

## Next steps

- Add your own tools — any pure function works well
- Try adding `.min()`, `.max()`, or `.regex()` constraints to Zod schemas
- Use `z.enum()` to restrict a parameter to specific values
