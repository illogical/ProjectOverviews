# DevPlanner — Human + AI Project Management Platform

## Purpose

DevPlanner is the **central planning hub** for the ecosystem. It bridges human developers and AI coding agents by providing a shared, transparent project management surface where cards are Markdown files, lanes are folders, and everything is version-controllable with Git. Both humans and AI agents read and write the same data — no proprietary database, no sync conflicts, no silos.

## Key Features

- **Kanban board** — drag-and-drop lanes with collapsible columns, lane focus mode, and animated transitions
- **Plain-text cards** — `.md` files with YAML frontmatter; readable by any tool (VS Code, grep, AI agents, shell scripts)
- **MCP server** — 17 tools + 3 resources for AI agent integration (Claude Code, GitHub Copilot, etc.)
- **Doc Manager** — integrated Markdown viewer/editor with hierarchical file browser for vault artifacts
- **Diff Viewer** — split-pane comparison with inline word highlights; git-aware mode switcher (All / Staged / Unstaged)
- **Git integration** — per-file status dots, stage/unstage/discard/commit from the UI
- **Vault artifacts** — write Markdown files to an Obsidian Vault and auto-attach as card links
- **Command palette** — `Ctrl+K` cross-project search across titles, tasks, tags, descriptions, and links
- **Skill evaluation framework** — score how well LLMs follow DevPlanner skill instructions; model sweeps and run comparison
- **Real-time sync** — WebSocket broadcasts all changes to connected clients
- **Activity history** — per-project and cross-project activity feed with time-bounded queries
- **Docker** — single-port containerized deployment (UI + API)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Backend | Elysia |
| Frontend | React 19 + Vite + Tailwind CSS 4 |
| State | Zustand |
| Drag-and-drop | @dnd-kit |
| AI Protocol | MCP SDK |
| Markdown | gray-matter + marked |

## Role in Ecosystem

DevPlanner serves two critical functions in the ecosystem:

1. **Project planning and task tracking** — The Kanban board is where work is planned, tracked, and completed. Cards represent features, bugs, and tasks across all projects in the ecosystem.

2. **AI agent orchestration surface** — Through MCP, AI agents can discover work, claim tasks, report progress, and mark completions. The artifact system provides the instructions that enable agents to work autonomously.

The artifact system is particularly important: cards aren't just task trackers — they're the **source of truth for implementation**. A card's description summarizes the feature, its task list breaks down the work, and its attached artifacts provide the detailed instructions an AI agent needs to implement the feature without direct human guidance. This makes DevPlanner the bridge between planning and autonomous implementation.

## Relationships

| Project | Relationship |
|---------|-------------|
| **LMEval** | Skill evals measure LLM compliance with DevPlanner instructions; future integration for cross-project eval tracking |
| **SplitDiff** | POC that informed the DevPlanner Diff Viewer implementation |
| **SourceManager** | Manages Git operations and server lifecycle for projects tracked in DevPlanner |
| **MemoryApi** | Could provide context-aware suggestions based on project history and patterns |
| **ProjectOverviews** | DevPlanner tracks tasks for all ecosystem projects including this one |
