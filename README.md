# claude-extras

A collection of extras, utilities, and samples for use with [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) — Anthropic's CLI for Claude.

This project explores the three main extensibility points of Claude Code: **hooks**, **skills**, and **MCP servers**. Each directory contains working examples and a detailed README explaining the concepts.

## Getting Started

Browse the area that interests you — each has its own README with setup instructions, explanations, and examples:

| Directory | What it covers | README |
|-----------|---------------|--------|
| [`hooks/`](hooks/) | Shell commands triggered by Claude Code events (pre/post tool use, notifications) | [hooks/README.md](hooks/README.md) |
| [`skills/`](skills/) | Custom slash commands built from prompt templates | [skills/README.md](skills/README.md) |
| [`mcp/`](mcp/) | MCP servers demonstrating tools, resources, prompts, and transports | [mcp/README.md](mcp/README.md) |

## How these fit together

| Mechanism | What it is | Triggered by |
|-----------|-----------|-------------|
| **Hooks** | Shell scripts that run in response to events | Claude Code events (e.g., before a tool runs, after a response) |
| **Skills** | Prompt templates exposed as `/slash` commands | User invocation |
| **MCP Servers** | Long-running processes that expose tools, resources, and prompts over JSON-RPC | Claude (tools) or the client app (resources, prompts) |
