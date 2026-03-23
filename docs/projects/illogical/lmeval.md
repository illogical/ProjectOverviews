# LMEval — Prompt Engineering Evaluation Platform

## Purpose

LMEval is the **quality feedback loop** for the ecosystem. It replaces intuition-based prompt engineering with evidence-based measurement: run side-by-side comparisons of prompt variants, evaluate responses against structured rubrics, and identify the best prompt + model combination for any task. Fully local, fully private, no per-token billing.

## Key Features

- **Side-by-side prompt comparison** (Quick Compare) — split-screen editor with parallel execution and syntax highlighting
- **N prompts × M models evaluation matrix** — test every combination in a single run with deterministic metric checks
- **Evaluation wizard** — 5-step guided UI (Prompts → Config → Run → Results → Summary)
- **Deterministic metrics** — keyword matching, forbidden phrase detection, JSON Schema validation, tool call verification
- **LLM-as-Judge scoring** — rubric-based 1–5 scoring with pairwise ranking to reduce position bias
- **Auto-template generation** — analyze a system prompt and auto-propose scoring dimensions and test cases
- **Versioned prompt library** — full version history with unified diffs between any two versions
- **Git integration** — version-control prompt changes and eval results with commit/revert support
- **Baseline regression detection** — compare evaluations against saved baselines to catch regressions
- **HTML/Markdown reports** — self-contained offline reports with model rankings and regression analysis
- **Evaluation presets** — save and load reusable configurations for repeatable workflows
- **WebSocket real-time updates** — live execution monitoring with per-model progress cards

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun / Node.js |
| Frontend | Vite + React 19 + TypeScript |
| Backend | Hono |
| Storage | File-based JSON + Markdown |
| Validation | Ajv (JSON Schema) |
| Charts | Recharts |
| Model calls | HTTP to LMApi |

## Role in Ecosystem

LMEval is the **current top priority** and a critical dependency for the broader ecosystem vision. Every project that uses AI prompts can benefit from systematic evaluation:

- **MemoryApi** relies on multiple prompts for summarization, categorization, tagging, and aggregation — each needs refinement against specific quality criteria
- **DevPlanner** has a built-in skill eval framework that could feed results into LMEval for cross-project prompt tracking
- **Command PiDog** AI agent skill prompt effectiveness could be measured and improved
- **Future autonomous loops** require LMEval's feedback to programmatically refine prompts

The long-term vision is for LMEval to be the foundation for **self-refinement workflows**: local AI models propose prompt changes, LMEval measures the impact, and a feedback loop selects winning variants — inspired by Karpathy's autoresearch approach.

## Relationships

| Project | Relationship |
|---------|-------------|
| **LMApi** | All evaluation prompts dispatch through LMApi |
| **MemoryApi** | Blocked on LMEval for measurable prompt improvements to summarization, categorization, tagging |
| **DevPlanner** | Skill evals share similar goals; candidates for LMEval integration |
| **ProjectOverviews** | Future phase: AI summarization prompts will be evaluated via LMEval |
