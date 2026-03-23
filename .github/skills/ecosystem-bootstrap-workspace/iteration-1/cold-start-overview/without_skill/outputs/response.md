Great question — there's a lot here, but it all fits together into a coherent picture. This workspace (ProjectOverviews) is basically the "map" for a personal AI-augmented development ecosystem. Let me break it down.

## The Big Picture

The developer behind these projects is building a **self-refining, local-first AI development stack** — a set of interconnected tools where local LLMs, AI agents, and a human developer collaborate on planning, building, and improving software. The philosophy is: local hardware, full control, measurable quality, no vendor lock-in.

## The Projects

Here's each project and what it does, organized by the layer it operates in:

### Planning Layer

- **DevPlanner** — The central hub. A Kanban-style project management app where cards are plain Markdown files with YAML frontmatter. It has an MCP server (17 tools) so AI agents like us can discover tasks, claim work, and report progress. It also has a built-in diff viewer, Git integration, artifact management, and a skill evaluation framework. Think of it as the "command center" for all ecosystem work. Tech: Bun + Elysia + React 19 + Vite + Tailwind.

- **ProjectOverviews** (this repo) — A documentation hub and index generator. It reads config.json, pulls in README files from all projects, and generates a linked Markdown index. The hand-crafted docs in `docs/projects/illogical/` describe each project's purpose, tech stack, and how it connects to others. The goal is to give any new AI agent (like me right now) instant context about the whole ecosystem.

### Inference Layer

- **LMApi** — The inference backbone. A smart router and load balancer sitting in front of multiple Ollama servers. It provides OpenAI-compatible endpoints, request queueing, sticky model assignment, cloud fallback via OpenRouter, and full metrics logging in SQLite. Every project that needs LLM capabilities is supposed to route through LMApi. Tech: Node.js/Bun + Express + SQLite + Socket.IO.

- **LMEval** — The quality feedback loop, and the **current top priority** for the ecosystem. It's a prompt engineering evaluation platform: run N prompts × M models, score with deterministic metrics (keyword matching, JSON schema validation) and LLM-as-Judge rubrics, track regressions against baselines, and generate reports. The vision is for LMEval to power self-refinement loops where the system automatically proposes, tests, and selects prompt improvements. Tech: Bun + Hono + React 19 + Vite + Recharts.

- **MemoryApi** — Long-term semantic memory for AI agents. It combines Qdrant (vector search), Neo4j (graph relationships), and SQLite (structured data) to give agents persistent context across conversations. It does automatic categorization, tagging, and context synthesis via LLM calls. Currently **blocked on LMEval** — the prompt quality for its AI features needs measurable refinement, which requires LMEval to be further along. Tech: Node.js + Express + Qdrant + Neo4j + SQLite.

### Deployment Layer

- **SourceManager** — A secure HTTP API for Git operations and dev server lifecycle management. An AI agent can push a branch, then tell SourceManager to pull it on the dev server, run install, restart the service, and health-check — all via API. This closes the loop between "agent writes code" and "changes are live." Tech: Bun + Elysia.

### Application Layer

- **Command PiDog** — A REST + WebSocket API for controlling a physical PiDog robot dog via Raspberry Pi. It has 30+ actions, camera streaming, and an AI agent endpoint that takes natural language and converts it to robot commands via local LLMs. It's a tangible demo of AI agent capabilities in hardware. Tech: Python + FastAPI.

- **PiDog Web** — The mobile-first React frontend for Command PiDog. Voice control is the hero feature (push-to-talk → Whisper STT → LLM → action). Also has manual controls, live camera, sensor dashboards, and log streaming. Tech: Vite + React 19 + TypeScript + Tailwind + Zustand.

- **SplitDiff** — A zero-dependency, browser-only side-by-side diff viewer. Originally a standalone tool, its UX patterns were adopted into DevPlanner's diff viewer. It's mostly a completed proof of concept at this point. Tech: Vanilla JS, no dependencies.

## How They Connect

The dependency flow looks roughly like this:

1. **DevPlanner** is the planning surface where all work is tracked
2. **LMApi** is the inference gateway — LMEval and MemoryApi route through it to talk to Ollama
3. **LMEval** measures prompt quality and feeds results back to improve MemoryApi, DevPlanner skills, and PiDog agent prompts
4. **MemoryApi** gives agents persistent memory across sessions
5. **SourceManager** deploys changes to running services
6. **ProjectOverviews** keeps every AI agent aligned on what exists and what matters

## What to Prioritize

Based on what I'm reading in the docs and task list:

1. **LMEval is the critical path.** It's explicitly marked as the #1 priority because it unblocks measurable improvement across everything else. If you're working on anything prompt-related (MemoryApi categorization, DevPlanner skills, PiDog agent), LMEval is what makes that work evidence-based instead of trial-and-error.

2. **MemoryApi is next but blocked.** Its AI features (summarization, categorization, tagging) all depend on prompts that need LMEval to refine. Once LMEval is more mature, MemoryApi becomes the focus.

3. **DevPlanner is continuous.** It's already production-ready but gets ongoing improvements — skill evals, multi-agent coordination, dashboard views.

4. **ProjectOverviews itself has a roadmap** — the TASKS.md shows planned phases: unit tests (in progress), AI summarization via LMApi, and model evaluation + reporting. The unit tests phase is partially done.

## If You Want to Be Helpful Right Now

- If working in this repo (ProjectOverviews): check TASKS.md — there are open items around unit tests and a future AI summarization pipeline.
- If working across the ecosystem: LMEval contributions have the highest leverage since they unblock improvements everywhere else.
- For any project: understand that the developer values measurable quality, local-first operation, and plain-text/Git-trackable formats. Don't suggest cloud-only solutions or proprietary formats.
