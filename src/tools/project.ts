import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { 
    createFormattedResponse, 
    createCreationResponse, 
    createDeletionResponse, 
    withErrorHandling 
} from "../utils/response.js";

export function registerProjectTools(server: McpServer, linearInstance: any, defaultTeamId: string) {
    // Create New Project In Linear
    server.registerTool("create-project", {
        title: "Create Project",
        description: "Create a new Linear project",
        inputSchema: {
            name: z.string(),
            description: z.string().optional(),
            priority: z.enum(["no priority", "urgent", "high", "normal", "low"]).optional(),
            content: z.string().optional(),
        }
    }, async ({ name, description, content, priority }) => {
        return withErrorHandling(async () => {
            const priorityMap = {
                "no priority": 0,
                "urgent": 1,
                "high": 2,
                "normal": 3,
                "low": 4
            }

            const project = await linearInstance.createProject({
                name,
                description,
                content,
                priority: priority ? priorityMap[priority] : undefined,
                teamIds: [defaultTeamId]
            })
            const createdProject = await project.project
            if (!createdProject) {
                throw new Error("Failed to create project")
            }
            return createCreationResponse("Project", createdProject.id, name);
        }, "creating project");
    })

    // Get All Projects
    server.registerTool("get-all-project", {}, async () => {
        return withErrorHandling(async () => {
            const myProjects = await linearInstance.projects();
            const formattedProjects = await Promise.all(
                myProjects.nodes.map(async (project: any) => {
                    return {
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        state: project.state,
                        priority: project.priority
                    }
                })
            )
            return createFormattedResponse(formattedProjects, "All Projects");
        }, "fetching projects");
    })

    // View Project Detail
    server.registerTool("view-project-detail", {
        title: 'View Single Project',
        description: 'View Single Project Detail By Id',
        inputSchema: {
            id: z.string()
        }
    }, async ({ id }) => {
        return withErrorHandling(async () => {
            const project = await linearInstance.project(id)
            return createFormattedResponse(project, "Project Details");
        }, "fetching project details");
    })

    // Delete Project
    server.registerTool("delete-project", {
        title: 'Delete Project',
        description: 'Delete Project By ID',
        inputSchema: {
            id: z.string()
        }
    }, async ({ id }) => {
        return withErrorHandling(async () => {
            await linearInstance.deleteProject(id)
            return createDeletionResponse("Project");
        }, "deleting project");
    })
}
