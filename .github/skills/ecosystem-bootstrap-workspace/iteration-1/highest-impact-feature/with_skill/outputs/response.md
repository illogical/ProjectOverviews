Given your ecosystem's dependency map, the single highest-impact thing you could build in a few hours is a **programmatic evaluation API for LMEval**.

Here's why: LMEval is your critical path. It's already feature-rich with the wizard UI, LLM-as-Judge, regression tracking, and deterministic metrics — but right now evaluations are driven through the frontend. The "build API for programmatic evaluation" goal is listed as a current focus area, and it's the key that unlocks your autonomous refinement loop vision.

## What to Build

A small REST API layer in LMEval (Hono makes this straightforward) that exposes evaluation runs programmatically:

```typescript
// POST /api/v1/evaluations/run
// Accepts a prompt set + model list + evaluation config, triggers a run, returns results

interface EvalRunRequest {
  prompts: { name: string; systemPrompt: string; userPrompt: string }[];
  models: string[];
  metrics: {
    keywords?: string[];
    forbiddenPhrases?: string[];
    jsonSchema?: object;
  };
  rubric?: { dimensions: { name: string; description: string; weight: number }[] };
}

// GET /api/v1/evaluations/:id/results
// Poll or retrieve completed results with scores and comparisons
```

A few hours gets you:
1. **`POST /api/v1/evaluations/run`** — accept a prompt set, model list, and metric config; dispatch through your existing evaluation engine; return a run ID
2. **`GET /api/v1/evaluations/:id`** — retrieve status and results for a run
3. **`GET /api/v1/evaluations/:id/results`** — structured results with per-model scores, metric breakdowns, and winner determination

## Why This Has the Biggest Cascading Impact

- **Unblocks MemoryApi** — MemoryApi's summarization, categorization, and tagging prompts are explicitly blocked on LMEval. With a programmatic API, you could write a script that tests MemoryApi prompt variants against concrete quality criteria without touching the LMEval UI. That blocker starts dissolving immediately.

- **Enables DevPlanner integration** — DevPlanner already has a skill eval framework. A programmatic API means skill eval results could be forwarded to LMEval for cross-project tracking, or DevPlanner could trigger LMEval runs as part of its workflow.

- **Foundation for autonomous refinement loops** — Your long-term vision is AI models proposing prompt variations, LMEval measuring them, and a feedback loop selecting winners. None of that works without a programmatic API. This is step one of that pipeline.

- **Every project benefits** — Any project with prompts (MemoryApi, DevPlanner skills, PiDog agent) can now run evaluations from CI, from scripts, or from other services.

## Implementation Sketch

Since LMEval already uses Hono and has the evaluation engine built out, you're essentially wiring up a new route group that calls into the same logic the frontend uses:

```typescript
// src/api/evaluations.ts
import { Hono } from 'hono';

const evaluations = new Hono();

evaluations.post('/run', async (c) => {
  const config = await c.req.json<EvalRunRequest>();
  // Validate config, create run record, dispatch to existing eval engine
  const runId = await startEvaluationRun(config);
  return c.json({ runId, status: 'running' }, 202);
});

evaluations.get('/:id', async (c) => {
  const run = await getEvaluationRun(c.req.param('id'));
  return c.json(run);
});

evaluations.get('/:id/results', async (c) => {
  const results = await getEvaluationResults(c.req.param('id'));
  return c.json(results);
});

export { evaluations };
```

The heavy lifting (dispatching prompts to LMApi, running metrics, scoring with LLM-as-Judge) already exists in LMEval's evaluation engine. You're building the HTTP interface to trigger it.

## Stretch Goals (If Time Permits)

- **Webhook callbacks** — POST results to a URL when a run completes, so MemoryApi or DevPlanner can react automatically
- **Preset endpoint** — `POST /api/v1/evaluations/run-preset/:presetName` to trigger saved evaluation configs by name
- **Baseline comparison** — include regression detection in the API response so callers know if a prompt change made things worse

This is a focused, achievable build that sits squarely on the critical path and multiplies the value of everything you've already built in LMEval. It matches your stack perfectly (TypeScript, Hono, Bun), and the result is immediately useful across the ecosystem.
