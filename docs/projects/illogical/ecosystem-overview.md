# Ecosystem Overview

## Mission Statement

**Build a self-refining, AI-augmented software development ecosystem where local AI models and autonomous agents collaborate with a human developer on planning, building, and improving software — prioritizing control, privacy, measurable quality, and minimal subscription costs.**

The ecosystem exists to answer one question: *How far can a solo developer go when every tool, workflow, and feedback loop is designed for human + AI collaboration from the ground up?*

Every project in this ecosystem serves a specific role in a larger architecture: agents that can plan work, write code, deploy changes, remember context, evaluate their own performance, and improve over time — all running on local hardware under the developer's full control.

---

## Core Principles

1. **Measurable quality over intuition** — Every AI-driven decision should be testable. Prompt changes are measured, not guessed at. Model selection is evidence-based.

2. **Local-first, subscription-minimal** — Run models on local hardware. Use cloud providers as fallbacks, not dependencies. Control your own data, memory, and inference.

3. **Deterministic where possible** — Prefer structured outputs, schema validation, and keyword verification over vague "good enough" assessments. Trust AI workflows by verifying them.

4. **Plain text, version-controlled** — Cards are Markdown. Prompts are files. Memory is queryable. Everything is Git-trackable and readable by both humans and machines.

5. **Designed for AI agents** — Every API, every data format, every workflow assumes an AI agent may be the consumer. MCP servers, structured REST endpoints, and file-based storage are built for machine consumption alongside human interaction.

6. **Continuous refinement** — Build feedback loops. Measure results. Let the system improve itself. The goal isn't a static toolbox — it's a living system that gets better over time.

---

## Architecture: How Projects Connect

```
┌─────────────────────────────────────────────────────────────────┐
│                        PLANNING LAYER                           │
│                                                                 │
│  ┌─────────────┐    ┌──────────────────┐                        │
│  │ DevPlanner  │───▶│ ProjectOverviews │                        │
│  │ (Kanban +   │    │ (Ecosystem Index │                        │
│  │  MCP + Git  │    │  + Summaries)    │                        │
│  │  Artifacts) │    └──────────────────┘                        │
│  └──────┬──────┘                                                │
│         │ tasks, cards, plans                                   │
├─────────┼───────────────────────────────────────────────────────┤
│         ▼           INFERENCE LAYER                             │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────────┐    │
│  │   LMApi     │◀───│   LMEval    │    │    MemoryApi     │    │
│  │ (Routing +  │    │ (Prompt     │    │ (RAG + Semantic  │    │
│  │  Balancing  │    │  Evaluation │    │  Memory + Graph) │    │
│  │  + Metrics) │    │  + Rubrics) │    └────────┬─────────┘    │
│  └──────┬──────┘    └──────┬──────┘             │              │
│         │                  │                     │              │
│         │    ┌─────────────┘                     │              │
│         │    │  refine prompts                   │              │
│         ▼    ▼                                   ▼              │
│  ┌──────────────┐                    ┌───────────────────┐     │
│  │ Ollama       │                    │ Qdrant + Neo4j    │     │
│  │ Servers      │                    │ + SQLite          │     │
│  └──────────────┘                    └───────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                     DEPLOYMENT LAYER                            │
│                                                                 │
│  ┌───────────────┐                                              │
│  │ SourceManager │   Git pull → install → restart → health ✓   │
│  │ (Git + Server │                                              │
│  │  Lifecycle)   │                                              │
│  └───────────────┘                                              │
├─────────────────────────────────────────────────────────────────┤
│                     APPLICATION LAYER                           │
│                                                                 │
│  ┌───────────────┐    ┌──────────────────┐    ┌───────────┐    │
│  │ Command PiDog │───▶│ PiDog Web        │    │ SplitDiff │    │
│  │ (Robot API)   │    │ (React Frontend) │    │ (Diff POC)│    │
│  └───────────────┘    └──────────────────┘    └───────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Dependency Map

| Project | Depends On | Depended On By |
|---------|-----------|----------------|
| **LMApi** | Ollama servers | LMEval, MemoryApi, (future: all LLM consumers) |
| **LMEval** | LMApi | MemoryApi (blocked), DevPlanner (skill evals), ProjectOverviews (future) |
| **DevPlanner** | — | All projects (planning surface), SourceManager (deployment trigger) |
| **MemoryApi** | LMApi, Qdrant, Neo4j, SQLite | Future AI agents, DevPlanner (context) |
| **SourceManager** | Git, managed project repos | DevPlanner (deployment), AI agents |
| **SplitDiff** | — | DevPlanner (Diff Viewer patterns) |
| **Command PiDog** | Ollama, PiDog hardware | PiDog Web |
| **PiDog Web** | Command PiDog API | — |
| **ProjectOverviews** | All project READMEs | AI agent bootstrapping, ecosystem documentation |

---

## Current Priorities

### 1. LMEval (Critical Path)

LMEval is the **highest priority** because it unblocks measurable improvement across the entire ecosystem. Every project with AI prompts — MemoryApi's categorization, DevPlanner's skill instructions, PiDog's agent skill — is currently refined through trial and error. LMEval transforms that into a systematic, reproducible process.

**Current state:** Feature-rich evaluation platform with wizard UI, LLM-as-Judge, regression tracking, and export. Active development.

**Next milestones:**
- Stabilize core evaluation workflows
- Integrate with DevPlanner skill eval data
- Build API for programmatic evaluation (needed for autonomous loops)

### 2. MemoryApi (Blocked on LMEval)

MemoryApi's AI-driven features (summarization, categorization, tagging, aggregation) depend on multiple prompts that need measurable refinement. Without LMEval providing feedback on prompt changes, improvements to memory quality are guesswork.

**Current state:** Functional RAG system with vector + graph + SQL storage. Prompt quality is the bottleneck.

**Next milestones:**
- Use LMEval to refine categorization and tagging prompts
- Implement result re-ranking across database types
- Optimize aggregation strategies for MCP consumption

### 3. DevPlanner (Continuous)

DevPlanner is continuously improved as the planning hub for all ecosystem work. The artifact system and skill evaluation framework are active focus areas.

**Current state:** Full-featured Kanban with MCP, Git integration, artifacts, and skill evals. Production-ready.

**Next milestones:**
- Refine agent skills for smaller local Ollama models
- Multi-agent coordination (claim/release, session registry)
- Dashboard view for project health metrics

---

## Long-Term Vision: Autonomous Refinement Loops

The ultimate goal is to build **self-improving feedback loops** where:

1. **LMEval** measures prompt effectiveness with deterministic metrics and LLM-as-Judge scoring
2. **Local AI models** propose prompt variations based on evaluation results
3. **Automated pipelines** test variations, compare against baselines, and select winners
4. **Memory** (via MemoryApi) tracks what was tried, what worked, and what to avoid
5. **Planning** (via DevPlanner) coordinates the work across projects
6. **Deployment** (via SourceManager) rolls out improvements to running services

This is inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch) — the idea that AI systems can direct their own research loops. Applied to prompt engineering and agent skill refinement, this means:

- **Prompt refinement as a measurable process**: every change to a system prompt produces quantified improvement/regression data
- **Model selection as an optimization problem**: given a prompt's purpose, LMEval identifies which available model performs best at acceptable latency
- **Agent skill improvement as an iterative loop**: DevPlanner skill evals, PiDog agent skills, and MemoryApi prompts all follow the same evaluate → refine → re-evaluate cycle
- **Cost optimization**: by running effective local models instead of cloud APIs, the ecosystem minimizes ongoing subscription costs while maintaining quality

The future includes:
- **Custom agent harness** — possibly using state machines or GOAP (Goal-Oriented Action Planning) patterns for agent orchestration
- **Knowledge graph as second brain** — MemoryApi's graph database becomes a persistent, queryable knowledge base that outlasts any single conversation
- **Portable, private AI stack** — full control over data, models, and workflows without vendor lock-in

---

## How This Project (ProjectOverviews) Fits

ProjectOverviews serves as the **bootstrap document** for the ecosystem. When a new AI agent or coding assistant enters the picture, it reads this project to understand:

1. **What projects exist** and what each one does
2. **How projects relate** to each other and to the overall mission
3. **What the current priorities** are and where help is most needed
4. **What the long-term vision** looks like and how individual features contribute

Adding a new project to the ecosystem requires only a config update — add the project to `config.json`, run the script to regenerate the index, and (in the future) the AI summarization pipeline automatically produces a summary that integrates the new project into the narrative.

This makes ProjectOverviews the **source of truth** for ecosystem awareness — the document that aligns every AI agent toward the same goals, intentions, and priorities.
