# Linear MCP Server

A Model Context Protocol (MCP) server that provides seamless integration with Linear for project and issue management.

## 🚀 Features

### Project Management
- ✅ **Create Projects** - Create new Linear projects with custom names, descriptions, priorities, and content
- ✅ **List Projects** - Get all projects in your workspace with detailed information
- ✅ **View Project Details** - Retrieve comprehensive information about specific projects
- ✅ **Delete Projects** - Remove projects from your workspace

### Issue Management
- ✅ **Create Issues** - Create new issues with titles, descriptions, priorities, and project assignments
- ✅ **List Issues** - View all issues assigned to you
- ✅ **Delete Issues** - Remove issues from your workspace
- ✅ **Auto-Assignment** - Issues are automatically assigned to the current user

### Team & User Management
- ✅ **Get Team Info** - View information about your Linear teams
- ✅ **Get Current User** - Display information about the authenticated user
- ✅ **Default Team** - Automatically uses your default team for operations

## 🛠️ Available Tools

### Project Tools
- `create-project` - Create a new Linear project
- `get-all-project` - List all projects
- `view-project-detail` - Get detailed project information
- `delete-project` - Delete a project by ID

### Issue Tools
- `create-issue` - Create a new issue
- `get-all-issues` - List all assigned issues
- `delete-issue` - Delete an issue by ID

### Team & User Tools
- `get-team-info` - Get team information
- `current-user` - Get current user information

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Linear API key

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd linear-mcp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Create a .env file
echo "LINEAR_API_KEY=your_linear_api_key_here" > .env
```

4. **Get your Linear API key:**
   - Go to [Linear Settings > API](https://linear.app/settings/account/security)
   - Generate a new API key
   - Add it to your `.env` file

## 🚀 Usage

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```


## 📁 Add server config 
```bash
{
  "mcpServers": {
    "linear-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/repo/dist/index.js"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key_here"
      }
    }
  }
}
```


## 💡 Usage Examples

### Creating a Project
```bash
# Create a project with basic info
create-project "My New Project"

# Create a project with full details
create-project "Advanced Project" --description "A complex project" --priority "high" --content "Project details here"
```

### Creating an Issue
```bash
# Create a basic issue
create-issue "Fix authentication bug"

# Create an issue with priority and project
create-issue "Implement new feature" --priority 2 --projectId "proj_123"
```

### Managing Projects
```bash
# List all projects
get-all-project

# View project details
view-project-detail --id "proj_123"

# Delete a project
delete-project --id "proj_123"
```

## 🔧 Configuration

### Environment Variables
- `LINEAR_API_KEY` - Your Linear API key (required)

### Priority Levels
- **0** - No priority
- **1** - Urgent
- **2** - High
- **3** - Normal
- **4** - Low

## 🏗️ Architecture

The server is built with a modular architecture for maintainability:

- **Modular Tools** - Each tool category has its own module
- **Standardized Responses** - Consistent response format across all tools
- **Error Handling** - Comprehensive error handling with context-aware messages
- **Type Safety** - Full TypeScript support with proper type definitions

## 📚 Development Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled application
- `npm run dev` - Run with hot reload (HMR)
- `npm run dev:watch` - Run with TypeScript compilation + nodemon
- `npm run watch` - Watch for changes and recompile automatically
- `npm run test` - Run tests with Jest
- `npm run clean` - Remove compiled output


## 🔗 Related

- [Linear API Documentation](https://developers.linear.app/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [TypeScript](https://www.typescriptlang.org/)
