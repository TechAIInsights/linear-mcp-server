import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { 
    createFormattedResponse, 
    createCreationResponse, 
    createDeletionResponse, 
    withErrorHandling 
} from "../utils/response.js";

export function registerIssueTools(server: McpServer, linearInstance: any, currentUser: any, defaultTeamId: string) {
    // Create Issue
    server.registerTool("create-issue", {
        title: 'Create Issue',
        description: 'Tool to create an issue',
        inputSchema: {
            title: z.string(),
            description: z.string().optional(),
            priority: z.number().min(0).max(4).optional(),
            projectId: z.string().optional(),
        }
    }, async ({ title, description, priority, projectId }) => {
        return withErrorHandling(async () => {
            const issue = await linearInstance.createIssue({
                title,
                description,
                priority,
                projectId,
                teamId: defaultTeamId,
                assigneeId: currentUser.id,
            })
            const createdIssue = await issue.issue
            if (!createdIssue) {
                throw new Error("Failed to create issue")
            }
            return createCreationResponse("Issue", createdIssue.id, title);
        }, "creating issue");
    })

    // Get All Issues
    server.registerTool("get-all-issues", {}, async ({ }) => {
        return withErrorHandling(async () => {
            const myIssues = await currentUser.assignedIssues();
            const formattedIssues = await Promise.all(
                myIssues.nodes.map(async (issue: any) => {
                    return {
                        name: currentUser.displayName,
                        title: issue.title
                    }
                })
            )
            return createFormattedResponse(formattedIssues, "All Issues");
        }, "fetching issues");
    })

    // Delete Issue
    server.registerTool("delete-issue", {
        title: 'Delete Issue',
        description: 'Delete Issue By ID',
        inputSchema: {
            id: z.string()
        }
    }, async ({ id }) => {
        return withErrorHandling(async () => {
            await linearInstance.deleteIssue(id)
            return createDeletionResponse("Issue");
        }, "deleting issue");
    })
}
