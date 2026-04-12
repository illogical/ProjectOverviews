# Project Overviews

**Gather, index, and summarize documentation across a software ecosystem with a bootstrap document that aligns every AI agent toward the same goals.**

ProjectOverviews is a TypeScript script and documentation hub that maintains a living index of all projects in a personal development ecosystem. It reads a configuration of whitelisted files across multiple repositories, generates a linked Markdown index, and provides hand-crafted summaries that explain how each project contributes to an overarching mission of building a self-refining, AI-augmented software development workflow.

## Why This Exists

When working with AI coding assistants and agents across multiple projects, each new conversation starts from zero. The agent doesn't know what other projects exist, how they relate, or what the developer is building toward. ProjectOverviews solves this by providing a single document that any AI agent can read to understand:

- **What projects exist** and what each one does
- **How they connect** into a coherent ecosystem
- **What the current priorities are** and where help is most needed
- **What the long-term vision looks like** — so the agent can make proactive suggestions that align with the developer's goals

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (latest)

### Setup

```bash
# Install dependencies
bun install

# Create your .env from the example
cp .env.example .env
# Edit .env — set BASE_PATH to the parent directory of your project repos
```

### Run

```bash
# Generate the ecosystem index
bun run start

# Or with file watching during development
bun run dev
```

The script reads `config.json`, resolves all whitelisted files, and generates `output/index.md`.

### Test

No `.env` or `BASE_PATH` setup is required to run the tests — the test suite uses temporary directories.

```bash
bun test
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BASE_PATH` | Yes | Absolute path to the parent directory containing all project repositories |

### config.json

The project registry. Edit this file to add or remove projects:

```json
{
  "outputDir": "./output",
  "projects": [
    {
      "name": "MyProject",
      "path": "my-project",
      "repo": "https://github.com/user/my-project",
      "description": "One-line summary of the project.",
      "files": ["README.md", "docs/architecture.md"]
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `outputDir` | Directory for generated output (relative to project root) |
| `projects[].name` | Display name for the project |
| `projects[].path` | Folder name relative to `BASE_PATH` |
| `projects[].repo` | GitHub repository URL |
| `projects[].description` | One-line project summary |
| `projects[].files` | Array of file paths relative to the project folder |

### Adding a New Project

1. Add an entry to the `projects` array in `config.json`
2. Run `bun run start` to regenerate the index
3. (Optional) Create a summary in `docs/projects/` following the existing pattern

## Project Structure

```
ProjectOverviews/
├── config.json              # Project registry — edit this to add projects
├── src/
│   ├── index.ts             # Entry point — orchestrates the pipeline
│   ├── config.ts            # Loads .env + config.json, validates paths
│   ├── files.ts             # Resolves and reads whitelisted files per project
│   ├── index-generator.ts   # Generates output/index.md from resolved files
│   └── types.ts             # TypeScript interfaces
├── docs/
│   ├── ecosystem-overview.md    # Mission statement, architecture, vision
│   └── projects/                # Per-project summaries
│       ├── lmapi.md
│       ├── lmeval.md
│       ├── devplanner.md
│       ├── memoryapi.md
│       ├── sourcemanager.md
│       ├── splitdiff.md
│       ├── command-pidog.md
│       └── command-pidog-web.md
├── output/                  # Generated files (gitignored)
│   └── index.md             # Auto-generated ecosystem index
├── .env.example             # Environment variable template
├── package.json
└── tsconfig.json
```

## Output

The script generates `output/index.md` containing:

- Generation timestamp
- Table of contents linking all projects
- Per-project sections with:
  - Project name and description
  - GitHub repository link
  - List of included files with absolute paths
  - Warnings for any missing files
- Summary statistics (project count, file count, missing count)

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/ecosystem-overview.md](docs/ecosystem-overview.md) | Mission statement, architecture diagram, dependency map, priorities, and long-term vision |
| [docs/projects/*.md](docs/projects/) | Individual project summaries with features, tech stack, ecosystem role, and relationships |

## Future Phases

- **AI Summarization** — Call LMApi with a prompt template + project files to auto-generate summaries
- **LMEval Integration** — Evaluate and refine the summarization prompt for quality
- **Auto-refresh** — Watch config for changes, regenerate on update
- **CI/CD** — Auto-generate on push to main
- **Narrative merging** — When a new project is added, automatically integrate its summary into the ecosystem narrative
