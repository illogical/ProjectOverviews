# ProjectOverviews

**ProjectOverviews is the ecosystem bootstrap layer for a local-first AI software stack.**

It does two complementary jobs:

1. **Generate a machine-friendly index** of whitelisted files across multiple repositories.
2. **Provide a human-written orientation layer** that explains what each project is for, how the projects connect, and what role each one plays in the broader system.

This repo exists because a multi-project AI ecosystem is hard for both humans and agents to hold in their heads. New conversations otherwise start from zero, which leads to repeated explanations, fuzzy boundaries, and bad assumptions.

ProjectOverviews gives a new human or agent a quick way to answer:
- What projects exist?
- Which project should own which responsibility?
- How do the projects fit together?
- What are the current priorities and architectural boundaries?

---

## The ecosystem this repo is trying to explain

This software ecosystem is not a pile of unrelated repos. It is a layered system for building local-first, AI-augmented development workflows.

### Planning and coordination
- **DevPlanner** — shared human+agent execution surface for cards, artifacts, and active work tracking
- **ProjectOverviews** — orientation layer that explains the ecosystem and keeps new agents aligned

### Execution and deployment
- **SourceManager** — git operations plus service lifecycle control for local/self-hosted projects

### Inference and quality loop
- **LMApi** — model routing, queueing, grouping, and observability for local model execution
- **LMEval** — prompt/model evaluation product for measurable prompt refinement and model comparison

### Knowledge and use-case layer
- **MemoryApi** — long-term semantic memory system and a realistic prompt-heavy production use case

### Supporting / application projects
- **SplitDiff** — diff-viewer patterns and interface ideas
- **Command PiDog** / **PiDog Web** — robotics/control applications that can later benefit from the same AI infrastructure

A very useful mental model is:

- **MemoryApi** provides real prompts and real quality problems.
- **LMApi** provides the execution substrate.
- **LMEval** provides the evaluation and refinement workflow.
- **ProjectOverviews** explains the whole picture so every new agent doesn’t have to rediscover it.

---

## Why this repo exists

When working with AI coding assistants across several repositories, each new session tends to lose:
- project boundaries
- current priorities
- shared vocabulary
- long-term architectural intent

ProjectOverviews reduces that drift by maintaining a durable orientation package.

It helps an agent understand:
- **what projects exist** and what each one does
- **how they connect** into a coherent architecture
- **what the priorities are** and where help is most useful
- **what not to confuse** — for example, not treating MemoryApi as the place to build LMEval’s product features

That last point matters. A good ecosystem overview is not just a catalog. It is a boundary document.

---

## How ProjectOverviews works

ProjectOverviews has two outputs with different purposes.

### 1. Generated index
The script reads `config.json`, resolves a whitelist of files from each project repo, and writes a linked markdown index to `output/index.md`.

This is the machine-oriented inventory layer.

It answers questions like:
- Which repos are in scope?
- Which files are included from each repo?
- Which configured files are missing?

### 2. Hand-written ecosystem docs
The `docs/projects/illogical/` folder contains hand-maintained summaries that explain:
- the ecosystem mission
- the role of each project
- how the projects depend on one another
- what the current priorities and bottlenecks are

This is the human-and-agent orientation layer.

The generated index tells you **what exists**.
The written docs try to explain **why it exists**.

---

## Quick start

### Prerequisites
- [Bun](https://bun.sh/) (latest)

### Setup

```bash
bun install
cp .env.example .env
# Edit .env and set BASE_PATH to the parent directory containing the project repos
```

### Generate the ecosystem index

```bash
bun run start
```

### Run with file watching during development

```bash
bun run dev
```

The script reads `config.json`, resolves whitelisted files across the configured repos, and generates `output/index.md`.

### Run tests

No `.env` or `BASE_PATH` setup is required for tests — they use temporary directories.

```bash
bun test
```

---

## Configuration

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BASE_PATH` | Yes | Absolute path to the parent directory containing all project repositories |

### `config.json`

This file is the project registry. Edit it to add or remove repos from the ecosystem index.

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

### Adding a new project

1. Add a new entry to the `projects` array in `config.json`
2. Run `bun run start` to regenerate the index
3. Add or update a summary under `docs/projects/illogical/` if the project affects the ecosystem narrative

---

## Repository structure

```text
ProjectOverviews/
├── config.json                         # Project registry for the generated index
├── src/
│   ├── index.ts                        # Entry point — orchestrates the pipeline
│   ├── config.ts                       # Loads .env + config.json, validates paths
│   ├── files.ts                        # Resolves and reads whitelisted files per project
│   ├── index-generator.ts              # Generates output/index.md from resolved files
│   └── types.ts                        # TypeScript interfaces
├── docs/
│   └── projects/
│       └── illogical/
│           ├── ecosystem-overview.md   # Mission, architecture, priorities, long-term vision
│           ├── lmapi.md
│           ├── lmeval.md
│           ├── devplanner.md
│           ├── memoryapi.md
│           ├── sourcemanager.md
│           ├── splitdiff.md
│           ├── command-pidog.md
│           └── command-pidog-web.md
├── output/                             # Generated files (gitignored)
│   └── index.md                        # Auto-generated ecosystem index
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Output

The generated `output/index.md` includes:
- generation timestamp
- table of contents linking all configured projects
- per-project sections with:
  - project name and description
  - GitHub repository link
  - included files with resolved paths
  - warnings for any missing files
- summary statistics such as project count, file count, and missing-file count

---

## Documentation map

| Document | Purpose |
|----------|---------|
| [docs/projects/illogical/ecosystem-overview.md](docs/projects/illogical/ecosystem-overview.md) | Mission statement, architecture map, dependency map, current priorities, and long-term vision |
| [docs/projects/illogical/lmapi.md](docs/projects/illogical/lmapi.md) | Why LMApi exists and how it serves as the inference substrate |
| [docs/projects/illogical/lmeval.md](docs/projects/illogical/lmeval.md) | Why LMEval matters as the quality feedback loop |
| [docs/projects/illogical/memoryapi.md](docs/projects/illogical/memoryapi.md) | Why MemoryApi matters as the memory layer and real benchmark source |
| [docs/projects/illogical/devplanner.md](docs/projects/illogical/devplanner.md) | Planning and execution role in the ecosystem |
| [docs/projects/illogical/sourcemanager.md](docs/projects/illogical/sourcemanager.md) | Deployment and repo-control role |

If you only read one document after this README, read `ecosystem-overview.md`.

---

## What this repo should help prevent

A good ProjectOverviews setup should reduce three recurring problems:

### 1. Starting every session from zero
A new assistant should be able to read this repo and quickly understand the ecosystem.

### 2. Blurry project boundaries
The docs should make it clear which repo owns which responsibility.

Examples:
- **LMApi** should own model routing and observability.
- **LMEval** should own prompt/model evaluation workflows.
- **MemoryApi** should be treated as a real use case and prompt source, not as the place to build a second evaluation product.

### 3. Losing the “why” behind the architecture
The generated index alone is not enough. The ecosystem docs need to preserve intent, priorities, and long-term direction.

---

## Future directions

Potential future phases for this repo include:
- **AI-assisted summary generation** from project source docs routed through LMApi
- **LMEval-backed summary prompt evaluation** so generated overviews can be measured and improved
- **Narrative merging** when a new project is added to the ecosystem
- **Auto-refresh / watch mode improvements**
- **CI/CD generation** on push to main

The important thing is not just to list projects, but to keep the ecosystem legible as it grows.
