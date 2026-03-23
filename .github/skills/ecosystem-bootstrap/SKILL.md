---
name: ecosystem-bootstrap
description: Understand the illogical AI-augmented development ecosystem — its projects, architecture, priorities, dependencies, and mission. Use this skill whenever working on ANY illogical project (LMEval, LMApi, DevPlanner, MemoryApi, SourceManager, SplitDiff, Command PiDog, PiDog Web, ProjectOverviews), when you need to understand how projects relate to each other, when deciding what to work on next, when suggesting features or improvements, when a user mentions their "ecosystem" or "local AI stack", or when you need context about the developer's goals and philosophy. This is your first stop for understanding the big picture.
---

# Ecosystem Bootstrap

You are working within a **self-refining, AI-augmented software development ecosystem** built by a solo developer. The guiding question behind everything: *How far can a solo developer go when every tool, workflow, and feedback loop is designed for human + AI collaboration from the ground up?*

Use this skill to orient yourself before diving into any project. It tells you what exists, why it exists, how things connect, and where effort matters most.

---

## Core Principles

These principles shape every design decision. When suggesting features or improvements, align with these:

1. **Measurable quality over intuition** — AI-driven decisions should be testable. Prompt changes are measured, not guessed at. Model selection is evidence-based.
2. **Local-first, subscription-minimal** — Run models on local hardware. Cloud providers are fallbacks, not dependencies. Full control over data, memory, and inference.
3. **Deterministic where possible** — Prefer structured outputs, schema validation, and keyword verification over vague assessments. Trust AI workflows by verifying them.
4. **Plain text, version-controlled** — Cards are Markdown. Prompts are files. Memory is queryable. Everything is Git-trackable and readable by both humans and machines.
5. **Designed for AI agents** — Every API, data format, and workflow assumes an AI agent may be the consumer. MCP servers, structured REST endpoints, and file-based storage are built for machine consumption alongside human interaction.
6. **Continuous refinement** — Build feedback loops. Measure results. The goal is a living system that improves itself over time, not a static toolbox.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PLANNING LAYER                           │
│  DevPlanner (Kanban + MCP + Artifacts)                          │
│  ProjectOverviews (Ecosystem Index + Summaries)                 │
├─────────────────────────────────────────────────────────────────┤
│                        INFERENCE LAYER                          │
│  LMApi (Routing + Balancing + Metrics)                          │
│  LMEval (Prompt Evaluation + Rubrics)                           │
│  MemoryApi (RAG + Semantic Memory + Graph)                      │
├─────────────────────────────────────────────────────────────────┤
│                       DEPLOYMENT LAYER                          │
│  SourceManager (Git pull → install → restart → health check)    │
├─────────────────────────────────────────────────────────────────┤
│                       APPLICATION LAYER                         │
│  Command PiDog (Robot API) → PiDog Web (React Frontend)         │
│  SplitDiff (Diff Viewer POC)                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Projects

### Tier 1 — Core (highest priority)

#### LMEval — Prompt Engineering Evaluation Platform
**Critical path for the entire ecosystem.** Replaces intuition-based prompt engineering with evidence-based measurement. Side-by-side prompt comparison, N×M evaluation matrix (prompts × models), deterministic metrics (keyword matching, JSON Schema validation), LLM-as-Judge rubric scoring, regression detection, and versioned prompt library.

- **Stack**: Bun, Hono, React 19, Vite, TypeScript, Recharts
- **Why it matters**: Every project with AI prompts is refined through trial and error until LMEval makes it systematic and reproducible. It unblocks MemoryApi's prompt quality improvements and enables future autonomous refinement loops.
- **Current focus**: Stabilize core evaluation workflows, integrate with DevPlanner skill eval data, build API for programmatic evaluation

#### DevPlanner — Human + AI Project Management Platform
**Central planning hub.** Kanban board where cards are Markdown files with YAML frontmatter, lanes are folders, and everything is Git-trackable. MCP server with 17 tools for AI agent integration. Artifact system provides implementation instructions for autonomous agent work. Built-in Diff Viewer and skill evaluation framework.

- **Stack**: Bun, Elysia, React 19, Vite, Tailwind CSS 4, Zustand, MCP SDK
- **Why it matters**: The bridge between planning and autonomous implementation. Cards are the source of truth — descriptions summarize features, task lists break down work, artifacts provide the detailed instructions agents need.
- **Current focus**: Refine agent skills for smaller local models, multi-agent coordination, dashboard view for project health

#### LMApi — Intelligent Ollama Router & Load Balancer
**Inference foundation.** Unified API layer over multiple Ollama servers with smart routing, priority-based server selection, sticky model assignment, parallel execution endpoints, OpenAI-compatible API, cloud fallback via OpenRouter, and complete metrics persistence in SQLite.

- **Stack**: Bun, Express/Fastify, SQLite, Socket.IO
- **Why it matters**: Single point of contact for all LLM inference. Centralizes metrics, logging, and server management. Feeds performance data back to LMEval.

#### MemoryApi — Long-Term Semantic Memory for AI Agents
**The second brain.** Persistent semantic memory across conversations using RAG with Qdrant (vector), Neo4j (graph, optional), and SQLite. Automatic categorization, tagging, and context synthesis via LLM-driven prompts. MCP-optimized output format.

- **Stack**: Node.js, Express, Qdrant, SQLite, Neo4j
- **Why it matters**: Enables continuity — agents remember preferences, project history, and past decisions. Currently **blocked on LMEval** because its summarization, categorization, and tagging prompts all need measurable refinement.
- **Current focus**: Use LMEval to refine prompts, implement result re-ranking across database types, optimize aggregation for MCP consumption

#### SourceManager — Git Operations & Server Lifecycle API
**Deployment bridge.** Secure HTTP API for Git operations (fetch, checkout, pull) and dev server lifecycle (start, stop, restart, health check). Token-authenticated, allowlisted repos, auto-detection of package managers, dry-run mode. Designed for AI agents to deploy without SSH access.

- **Stack**: Bun, Elysia, JSON config, NDJSON logging
- **Why it matters**: Closes the loop — agent writes code → pushes branch → SourceManager deploys on dev server → hot reload shows results. The agent's hardware doesn't matter; the dev server does the heavy lifting.

### Tier 2 — Supporting

#### ProjectOverviews — Ecosystem Index & Summaries
Generates a Markdown index of all ecosystem projects from config. Future phases include AI-powered summarization via LMApi and model evaluation scoring via LMEval. This is where the ecosystem-bootstrap skill lives.

- **Stack**: Bun, TypeScript

#### SplitDiff — Browser-Based Diff Viewer
Zero-dependency, client-side diff viewer. Served as a proof-of-concept whose patterns (side-by-side comparison, word-level highlighting, hunk navigation) were incorporated into DevPlanner's Diff Viewer. Useful for quick ad-hoc comparisons.

- **Stack**: Vanilla JavaScript, no dependencies

### Tier 3 — Fun / Experimental

#### Command PiDog & PiDog Web — Robot Dog Control
A Raspberry Pi robot dog with REST + WebSocket API, AI agent endpoint (natural language → robot actions via Ollama), voice commands, camera streaming, and a mobile-first React frontend. These are fun projects that give AI agents a physical robot to interact with — sensors, lights, sound, and movement for real-world feedback. Uses a single Ollama server directly (does not require LMApi). Could eventually benefit from LMEval for agent prompt refinement.

- **Stack**: Python/FastAPI (backend), React 19/Vite/TypeScript (frontend)

---

## Dependency Map

| Project | Depends On | Depended On By |
|---------|-----------|----------------|
| **LMApi** | Ollama servers | LMEval, MemoryApi |
| **LMEval** | LMApi | MemoryApi (blocked), DevPlanner (skill evals) |
| **DevPlanner** | — | All projects (planning), SourceManager (deployment) |
| **MemoryApi** | LMApi, Qdrant, Neo4j, SQLite | Future AI agents, DevPlanner (context) |
| **SourceManager** | Git, managed repos | DevPlanner (deployment), AI agents |
| **SplitDiff** | — | DevPlanner (Diff Viewer patterns) |
| **ProjectOverviews** | All project READMEs | AI agent bootstrapping |
| **Command PiDog** | Ollama, PiDog hardware | PiDog Web |

Key blocker: **MemoryApi ← LMEval** — Memory's AI features (summarization, categorization, tagging) need measurable prompt refinement that only LMEval can provide.

---

## Long-Term Vision: Autonomous Refinement Loops

The ultimate goal is **self-improving feedback loops**:

1. **LMEval** measures prompt effectiveness with deterministic metrics and LLM-as-Judge scoring
2. **Local AI models** propose prompt variations based on evaluation results
3. **Automated pipelines** test variations, compare against baselines, select winners
4. **MemoryApi** tracks what was tried, what worked, and what to avoid
5. **DevPlanner** coordinates work across projects
6. **SourceManager** deploys improvements to running services

This means prompt refinement as a measurable process, model selection as an optimization problem, agent skill improvement as an iterative loop, and cost optimization through effective local models instead of cloud APIs.

Future plans include a custom agent harness (possibly state machines or GOAP patterns), the knowledge graph as a persistent second brain, and a fully portable, private AI stack with no vendor lock-in.

---

## How to Be an Effective Agent in This Ecosystem

When working on any project:

1. **Check current priorities** — LMEval is the critical path. If you can contribute there, that has the highest impact.
2. **Understand the dependency chain** — Don't suggest features for MemoryApi's AI capabilities that require prompt refinement without acknowledging the LMEval dependency.
3. **Align with core principles** — Prefer local-first, measurable, deterministic, plain-text solutions. Suggest structured outputs over freeform responses.
4. **Think in feedback loops** — The best features are ones that produce measurable data that can feed back into improvement. Build things that can evaluate and refine themselves.
5. **Design for AI consumers** — APIs, data formats, and workflows may be consumed by AI agents. MCP integration, structured endpoints, and machine-readable outputs are valued.
6. **Proactively suggest improvements** — If you see something that could be more measurable, more automated, or better integrated across projects, say so. This ecosystem is designed to get better over time, and cross-project insights are especially valuable.
7. **Keep it lean** — This is a solo developer's ecosystem. Prefer focused, impactful changes over comprehensive overhauls. Ship incremental improvements that compound.
