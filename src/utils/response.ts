/**
 * Utility functions for handling MCP server responses
 */

export interface McpResponse {
    [x: string]: unknown;
    content: Array<{
        [x: string]: unknown;
        type: "text";
        text: string;
        _meta?: { [x: string]: unknown; } | undefined;
    }>;
    _meta?: { [x: string]: unknown; } | undefined;
    structuredContent?: { [x: string]: unknown; } | undefined;
    isError?: boolean | undefined;
}

/**
 * Creates a success response with JSON data
 */
export function createJsonResponse(data: any): McpResponse {
    return {
        content: [{
            type: "text",
            text: JSON.stringify(data, null, 2)
        }]
    };
}

/**
 * Creates a success response with a simple text message
 */
export function createSuccessResponse(message: string): McpResponse {
    return {
        content: [{
            type: "text",
            text: message
        }]
    };
}

/**
 * Creates an error response with error message
 */
export function createErrorResponse(error: unknown, context: string = "operation"): McpResponse {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
        content: [{
            type: "text",
            text: `Error ${context}: ${errorMessage}`
        }]
    };
}

/**
 * Creates a response with formatted data (for lists, details, etc.)
 */
export function createFormattedResponse(data: any, title?: string): McpResponse {
    let responseText = '';
    
    if (title) {
        responseText += `## ${title}\n\n`;
    }
    
    if (Array.isArray(data)) {
        if (data.length === 0) {
            responseText += "No items found.";
        } else {
            responseText += JSON.stringify(data, null, 2);
        }
    } else {
        responseText += JSON.stringify(data, null, 2);
    }
    
    return {
        content: [{
            type: "text",
            text: responseText
        }]
    };
}

/**
 * Creates a response for successful creation operations
 */
export function createCreationResponse(itemType: string, id: string, name?: string): McpResponse {
    const message = name 
        ? `${itemType} "${name}" created successfully. ID: ${id}`
        : `${itemType} created successfully. ID: ${id}`;
    
    return createSuccessResponse(message);
}

/**
 * Creates a response for successful deletion operations
 */
export function createDeletionResponse(itemType: string, name?: string): McpResponse {
    const message = name 
        ? `${itemType} "${name}" deleted successfully`
        : `${itemType} deleted successfully`;
    
    return createSuccessResponse(message);
}

/**
 * Wraps an async function with error handling
 */
export async function withErrorHandling(
    operation: () => Promise<McpResponse>,
    context: string = "operation"
): Promise<McpResponse> {
    try {
        const result = await operation();
        return result;
    } catch (error) {
        return createErrorResponse(error, context);
    }
}
