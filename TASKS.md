# ProjectOverviews — Task List

## Phase 0: Base Script (Complete)

- [x] Config loading with BASE_PATH validation
- [x] Per-project file resolution (found / missing tracking)
- [x] Markdown index generation (TOC, per-project sections, summary stats)
- [x] Entry point orchestrating the full pipeline
- [ ] Export `generateIndex()` for testability

## Phase 1: Unit Tests

- [ ] Add `"test": "bun test"` to package.json scripts
- [ ] `src/config.test.ts` — config loading edge cases (missing env, bad path, invalid JSON, missing projects array)
- [ ] `src/files.test.ts` — file resolution (found, missing, empty array, mixed)
- [ ] `src/index-generator.test.ts` — markdown output correctness (heading, TOC anchors, stats, conditional sections)

## Phase 2: AI Summarization (LMApi Integration)

- [ ] Add `LMAPI_URL` and `SUMMARY_MODEL` to `.env.example` and `src/config.ts`
- [ ] Create `src/summarizer.ts` — LMApi client + structured prompt for project summaries
- [ ] Implement hash-based change detection (`output/hashes.json`) to skip unchanged projects
- [ ] Create `src/summarize-projects.ts` — summarization pipeline entry point
- [ ] Write summaries to `docs/projects/{projectName}.md` with `generated: true` frontmatter + model/date metadata
- [ ] Add `"summarize": "bun run src/summarize-projects.ts"` script to package.json

## Phase 3: Model Evaluation + Report

- [ ] Create `src/eval/evaluator.ts` — deterministic metrics (term coverage, section completeness) + LLM-as-Judge scoring
- [ ] Create `src/eval/run-eval.ts` — iterate all available models × all projects, collect scores
- [ ] Create `src/eval/report-generator.ts` — produce `output/eval-report.md`
- [ ] Add `"eval": "bun run src/eval/run-eval.ts"` script to package.json
- [ ] Score AI summaries against hand-crafted references in `docs/projects/illogical/`
- [ ] Report: model × project score table + winner recommendation + latency tradeoff analysis
