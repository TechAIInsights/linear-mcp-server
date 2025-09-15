import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createFormattedResponse, withErrorHandling } from "../utils/response.js";

export function registerTeamTools(server: McpServer, linearInstance: any, defaultTeamId: string) {
    // Get Team Info Tool
    server.registerTool('get-team-info', {}, async ({ }) => {
        return withErrorHandling(async () => {
            const teams = await linearInstance.teams()
            const formattedTeams = teams.nodes.map((team: any) => ({
                id: team.id,
                name: team.name,
                key: team.key,
                color: team.color,
                isDefault: team.id === defaultTeamId
            }))
            return createFormattedResponse(formattedTeams, "Team Information");
        }, "fetching team info");
    })
}
