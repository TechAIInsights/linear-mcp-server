import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSuccessResponse, withErrorHandling } from "../utils/response.js";

export function registerUserTools(server: McpServer, currentUser: any) {
    // Get Current User Tool 
    server.registerTool('current-user', {}, async ({ }) => {
        return withErrorHandling(async () => {
            return createSuccessResponse(`Current User: ${currentUser.name}`);
        }, "fetching current user");
    })
}
