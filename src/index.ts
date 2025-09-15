import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "./linear/client.js";
import 'dotenv/config'

// Import tool modules
import { registerUserTools } from "./tools/user.js";
import { registerTeamTools } from "./tools/team.js";
import { registerProjectTools } from "./tools/project.js";
import { registerIssueTools } from "./tools/issue.js";

// Initialize Linear client
const linearClient = new Client
const linearInstance = linearClient.getInstance()

// Create MCP Server
const server = new McpServer({
    name: "linear-mcp",
    version: "1.0.0",
    description: "A MCP server for Linear",
    capabilities: {
        resourcers: {},
        tools: {}
    },
});

// Get Default Team ID
let defaultTeamId: string = ''
const currentUser = await linearInstance.viewer;

const getDefaultTeam = async () => {
    const teams = await linearInstance.teams()
    const defaultTeam = teams.nodes[0]
    if (!defaultTeam) {
        throw new Error("No teams found in Linear workspace")
    }
    defaultTeamId = defaultTeam.id
}

await getDefaultTeam().catch((err) => console.error(err))

// Register all tool modules
registerUserTools(server, currentUser);
registerTeamTools(server, linearInstance, defaultTeamId);
registerProjectTools(server, linearInstance, defaultTeamId);
registerIssueTools(server, linearInstance, currentUser, defaultTeamId);

const transport = new StdioServerTransport()
server.connect(transport)