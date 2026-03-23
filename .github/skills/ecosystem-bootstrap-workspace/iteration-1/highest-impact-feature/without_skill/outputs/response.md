Great question — with a few hours and TypeScript/React skills, you're well-positioned to push the most critical bottleneck in your ecosystem.

## Recommendation: Build LMEval's Programmatic Evaluation API

Looking at your ecosystem, **LMEval is the critical path**. It's explicitly your #1 priority, and for good reason — MemoryApi's AI features (categorization, tagging, summarization) are blocked on it, DevPlanner's skill evals could feed into it, and even Command PiDog's agent prompt would benefit. But right now, LMEval is a UI-driven tool. The missing piece that would multiply its impact is a **programmatic API** that lets other projects trigger evaluations without a human clicking through the wizard.

This is already called out as a next milestone in your own docs:

> Build API for programmatic evaluation (needed for autonomous loops)

### Why This Has the Biggest Impact

1. **Unblocks MemoryApi immediately.** You could wire up MemoryApi's categorization and tagging prompts to run through LMEval evaluations on every change — turning guesswork into measured refinement.

2. **Enables the self-refinement loop.** The long-term vision you described (AI proposes prompt changes → LMEval measures impact → winning variants are selected) requires a programmatic API. Without it, a human is always in the loop clicking through the UI.

3. **Makes LMEval a platform, not just a tool.** Right now, LMEval is a destination you visit. With an API, it becomes infrastructure that every project consumes — the same leap LMApi made by centralizing inference behind an API layer.

4. **You already have everything you need.** LMEval runs on Hono + Bun, you're fluent in TypeScript, and the evaluation logic already exists in the backend — you're essentially exposing existing capabilities through new endpoints.

### What to Build in a Few Hours

**Core endpoints** (Hono routes on the existing LMEval backend):

- `POST /api/v1/evaluations` — Submit an evaluation run: accepts prompt variants, model list, rubric config, and test cases. Returns a run ID.
- `GET /api/v1/evaluations/:runId` — Poll for status and results (or use the existing WebSocket for real-time updates).
- `GET /api/v1/evaluations/:runId/results` — Fetch structured results: scores per model × prompt, deterministic metric outcomes, judge verdicts.
- `POST /api/v1/presets/:presetId/run` — Trigger a saved evaluation preset programmatically (leverages the preset system you already have).

**Stretch goals if time permits:**

- `POST /api/v1/evaluations/:runId/compare/:baselineId` — Compare a run against a saved baseline and return regression/improvement deltas.
- A simple TypeScript client package (`@illogical/lmeval-client`) that other projects can import for type-safe API calls.

### Quick Validation

Once the API is live, you can prove the value immediately by writing a small script in the MemoryApi repo that:

1. Loads the current categorization prompt
2. Submits it to LMEval with 5-10 test memories and a rubric (correct category, confidence score, etc.)
3. Prints the scores

That single script turns MemoryApi's prompt development from "try it and see" into "run the eval and know." And it's the first step toward autonomous prompt refinement across the whole ecosystem.

### Where It Fits in the Architecture

```
DevPlanner ──────┐
MemoryApi ───────┤  POST /api/v1/evaluations
Command PiDog ───┤         │
Future Agents ───┘         ▼
                     ┌──────────┐
                     │  LMEval  │──── LMApi ──── Ollama
                     │  (API +  │
                     │   UI)    │
                     └──────────┘
```

This is the single change that upgrades LMEval from a standalone evaluation tool into the ecosystem's quality backbone — and it's a natural fit for a few hours of focused TypeScript work on a codebase you already know.
