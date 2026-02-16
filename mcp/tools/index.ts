import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "string-utils",
  version: "1.0.0",
});

server.registerTool(
  "word_count",
  {
    description: "Count the number of words in a string",
    inputSchema: {
      text: z.string().describe("Text to count words in"),
    },
  },
  async ({ text }) => {
    const count = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    return {
      content: [{ type: "text", text: `${count}` }],
    };
  }
);

server.registerTool(
  "reverse_text",
  {
    description: "Reverse a string, optionally by words instead of characters",
    inputSchema: {
      text: z.string().describe("Text to reverse"),
      by_word: z
        .boolean()
        .optional()
        .default(false)
        .describe("Reverse word order instead of characters"),
    },
  },
  async ({ text, by_word }) => {
    const result = by_word
      ? text.split(/\s+/).reverse().join(" ")
      : [...text].reverse().join("");
    return {
      content: [{ type: "text", text: result }],
    };
  }
);

server.registerTool(
  "slugify",
  {
    description: "Convert text to a URL-friendly slug",
    inputSchema: {
      text: z.string().describe("Text to slugify"),
      separator: z
        .string()
        .optional()
        .default("-")
        .describe("Separator character (default: -)"),
    },
  },
  async ({ text, separator }) => {
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, separator)
      .replace(new RegExp(`[${separator}]+`, "g"), separator);
    return {
      content: [{ type: "text", text: slug }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("string-utils MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
