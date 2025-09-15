import { LinearClient } from "@linear/sdk";

export class Client {
    client: LinearClient
    constructor(apiKey?: string) {
        if (!apiKey && !process.env.LINEAR_API_KEY) {
            throw new Error('Linear API key is required');
        }
        this.client = new LinearClient({
            apiKey: apiKey || process.env.LINEAR_API_KEY
        })
    }
    public getInstance(): LinearClient {
        return this.client;
    }
}

