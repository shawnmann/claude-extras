import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "project-info",
  version: "1.0.0",
});

// --- Static resources ---

server.registerResource(
  "project-config",
  "config://project",
  {
    description: "Project configuration and metadata",
    mimeType: "application/json",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(
          {
            name: "claude-extras",
            version: "1.0.0",
            language: "TypeScript",
            license: "MIT",
            repository: "https://github.com/example/claude-extras",
          },
          null,
          2
        ),
      },
    ],
  })
);

server.registerResource(
  "guidelines",
  "config://guidelines",
  {
    description: "Project coding guidelines",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: [
          "Project Guidelines",
          "==================",
          "1. Keep code simple and focused",
          "2. Avoid over-engineering; prefer minimal solutions",
          "3. Write clear, self-documenting code over heavy comments",
          "4. Use TypeScript strict mode",
          "5. Prefer composition over inheritance",
        ].join("\n"),
      },
    ],
  })
);

// --- Dynamic resource template ---

const teamMembers: Record<string, { name: string; role: string; team: string }> = {
  alice: { name: "Alice", role: "Tech Lead", team: "Platform" },
  bob: { name: "Bob", role: "Senior Engineer", team: "Platform" },
  carol: { name: "Carol", role: "Designer", team: "Product" },
};

server.registerResource(
  "team-member-profile",
  new ResourceTemplate("team://{memberId}/profile", {
    list: async () => ({
      resources: Object.entries(teamMembers).map(([id, member]) => ({
        uri: `team://${id}/profile`,
        name: member.name,
        description: `${member.role} on ${member.team}`,
      })),
    }),
  }),
  {
    description: "Team member profile by ID",
    mimeType: "application/json",
  },
  async (uri, { memberId }) => {
    const id = Array.isArray(memberId) ? memberId[0] : memberId;
    const member = teamMembers[id];
    if (!member) {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify({ error: `Unknown member: ${id}` }),
          },
        ],
      };
    }
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(member, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("project-info MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
