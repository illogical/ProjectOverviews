Great question — there's a lot here but it all fits together in a coherent way. You're working inside a **self-refining, AI-augmented development ecosystem** built by a solo developer. The driving idea is: how far can one person go when every tool and workflow is designed for human + AI collaboration from the ground up?

Here's the rundown.

---

## The Big Picture

There are ~9 projects organized into layers. Think of it like a stack:

- **Planning** — where work gets tracked and coordinated
- **Inference** — where AI models run, get evaluated, and remember things
- **Deployment** — where code gets shipped to dev servers
- **Application** — end-user-facing projects (including a robot dog)

Everything is local-first, plain-text, Git-tracked, and designed so AI agents (like us) can be first-class consumers of every API and data format.

---

## The Projects

### Tier 1 — Core (where most of the action is)

**LMEval** — Prompt evaluation platform. This is the **single highest priority** right now. It lets you compare prompt variants side-by-side across multiple models, score them with deterministic metrics (keyword matching, JSON schema validation) and LLM-as-Judge rubrics, and detect regressions. It replaces guesswork in prompt engineering with measurement. Stack: Bun, Hono, React 19, Vite.

**DevPlanner** — Kanban-style project management where cards are Markdown files with YAML frontmatter and lanes are folders. It has an MCP server with 17 tools so AI agents can discover tasks, claim work, and report progress. The artifact system lets cards carry detailed implementation instructions for autonomous agent work. Stack: Bun, Elysia, React 19, Tailwind, Zustand.

**LMApi** — Unified API layer over multiple Ollama servers. Smart routing, load balancing, sticky model assignment, OpenAI-compatible endpoints, cloud fallback via OpenRouter, and full metrics in SQLite. Every project that needs LLM inference goes through LMApi. Stack: Bun, Express/Fastify, SQLite, Socket.IO.

**MemoryApi** — Long-term semantic memory for AI agents. RAG with Qdrant (vector), Neo4j (graph, optional), and SQLite. Stores memories as embeddings, auto-categorizes and tags them via LLM, and synthesizes context for retrieval. The catch: its AI features are **blocked on LMEval** — the prompts for summarization, categorization, and tagging need measurable refinement. Stack: Node.js, Express, Qdrant, SQLite.

**SourceManager** — Deployment bridge. Secure HTTP API for Git operations (fetch, pull, checkout) and dev server lifecycle (start, stop, restart, health check). This closes the loop: an agent writes code, pushes a branch, and SourceManager deploys it on the dev server. Stack: Bun, Elysia.

### Tier 2 — Supporting

**ProjectOverviews** — This workspace! Generates a Markdown index of all ecosystem projects. Future phases include AI-powered summarization. It's the bootstrap doc that orients new agents (like me right now).

**SplitDiff** — Zero-dependency browser diff viewer. Started as a POC; its patterns (side-by-side comparison, word-level highlighting) got folded into DevPlanner's built-in Diff Viewer.

### Tier 3 — Fun / Experimental

**Command PiDog** + **PiDog Web** — A Raspberry Pi robot dog with a REST/WebSocket API and a React frontend. It has an AI agent endpoint that converts natural language to robot actions via Ollama. Fun project that gives AI agents a physical thing to interact with.

---

## How They Connect

The critical dependency chain to understand:

```
LMApi  ←──  LMEval  ←──  MemoryApi
  ↑                          ↑
  └── Ollama servers         └── (blocked until LMEval can measure prompt quality)
```

- **LMApi** is the inference foundation — everything that calls an LLM goes through it.
- **LMEval** uses LMApi to evaluate prompts across models. It's the quality gate.
- **MemoryApi** can't meaningfully improve its AI features until LMEval exists to measure whether prompt changes actually help.
- **DevPlanner** coordinates work across all projects and is where tasks live.
- **SourceManager** handles deployment — the last mile from code to running service.

---

## What to Prioritize

If you want to be maximally helpful, here's the priority order:

1. **LMEval** — It's the critical path. Anything that stabilizes its core evaluation workflows, improves its API for programmatic use, or makes it more reliable has cascading benefits across the entire ecosystem.

2. **MemoryApi** — Once LMEval is in good shape, MemoryApi's prompt refinement work gets unblocked. Until then, contributions to its infrastructure (API, storage, retrieval) are still valuable.

3. **DevPlanner** — Continuous improvement target. The skill evaluation framework and multi-agent coordination are active areas.

4. **Everything else** — LMApi is fairly stable, SourceManager does its job, and the PiDog projects are fun but lower priority.

---

## Principles to Keep in Mind

When suggesting changes or features in any project:

- **Measurable over intuitive** — if it can't be tested or quantified, question whether it's the right approach
- **Local-first** — cloud is a fallback, not a dependency
- **Plain text, Git-tracked** — Markdown files, structured JSON, file-based storage
- **Design for AI consumers** — MCP endpoints, structured outputs, machine-readable formats
- **Keep it lean** — this is a solo dev ecosystem, so focused incremental improvements beat comprehensive overhauls

The long-term vision is autonomous refinement loops: LMEval measures prompt quality → AI proposes improvements → automated pipelines test them → MemoryApi remembers what worked → DevPlanner coordinates the work → SourceManager deploys it. A self-improving system.

Let me know which project you'd like to dig into and I'll get up to speed on the specifics.
