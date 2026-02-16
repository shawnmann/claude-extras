import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "writing-assistant",
  version: "1.0.0",
});

// --- Single-message prompt with optional enum ---

server.registerPrompt(
  "summarize",
  {
    description: "Summarize the given text in a specific style",
    argsSchema: {
      text: z.string().describe("The text to summarize"),
      style: z
        .enum(["brief", "detailed", "bullet-points"])
        .optional()
        .default("brief")
        .describe("Summary style"),
    },
  },
  ({ text, style }) => {
    const styleInstructions: Record<string, string> = {
      brief: "Provide a 1-2 sentence summary.",
      detailed: "Provide a thorough summary covering all key points.",
      "bullet-points": "Summarize as a bulleted list of key points.",
    };

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `${styleInstructions[style]}\n\nText to summarize:\n${text}`,
          },
        },
      ],
    };
  }
);

// --- Multi-message prompt with system role ---

server.registerPrompt(
  "code_review",
  {
    description: "Review code for quality, bugs, and improvements",
    argsSchema: {
      code: z.string().describe("The code to review"),
      language: z
        .string()
        .optional()
        .default("unknown")
        .describe("Programming language of the code"),
    },
  },
  ({ code, language }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: [
            "You are a senior code reviewer. Review the following code for:",
            "1. Bugs and potential errors",
            "2. Code style and readability",
            "3. Performance concerns",
            "4. Security issues",
            "",
            "Be constructive and specific. Suggest fixes where possible.",
            "",
            `Language: ${language}`,
            "",
            "```",
            code,
            "```",
          ].join("\n"),
        },
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("writing-assistant MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
