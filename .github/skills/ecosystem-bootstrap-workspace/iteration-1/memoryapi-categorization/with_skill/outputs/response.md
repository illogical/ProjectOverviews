Good news — you're right to focus on categorization prompt quality, since it's one of MemoryApi's biggest bottlenecks. But the best approach here is shaped heavily by what else is happening in your ecosystem.

## The LMEval Dependency — This Is the Critical Path

MemoryApi's categorization prompts are explicitly **blocked on LMEval** in your current priority map, and for good reason. Right now, any changes you make to those categorization prompt templates are essentially guesswork — you can tweak wording, adjust few-shot examples, or restructure the prompt, but you have no systematic way to measure whether the change actually improved tagging accuracy. You're flying blind.

**LMEval** is your prompt evaluation platform, and it's designed exactly for this problem: side-by-side prompt comparison, deterministic metrics (keyword matching, JSON Schema validation), and LLM-as-Judge rubric scoring. Before you sink time into iterating on MemoryApi's categorization prompts by hand, consider whether LMEval is stable enough to use as your evaluation harness. If it is — even partially — you'll save significant time by measuring instead of guessing.

## Recommended Approach

### 1. Build a categorization eval dataset first

Before touching prompts, collect ground truth. Take a representative sample of memories that MemoryApi has processed and manually tag them with the correct categories. This becomes your test corpus. Without it, you can't measure improvement no matter which tool you use.

### 2. Set up an LMEval evaluation for categorization

Create an evaluation in LMEval that:
- Feeds sample memories through your categorization prompt variants
- Uses **deterministic metrics** to check for expected category keywords in the output
- Uses **LLM-as-Judge** with a rubric focused on category relevance, specificity, and consistency
- Tests across the models available through **LMApi** — categorization accuracy can vary dramatically between models, and LMApi's routing metrics will tell you which model performs best for this specific task

### 3. Iterate on the prompts with measured feedback

With the eval harness in place, you can systematically try:
- **Structured output enforcement** — require JSON output with a category field and validate with JSON Schema (aligns with your "deterministic where possible" principle)
- **Few-shot examples** — include 3-5 exemplar memories with correct categories in the prompt
- **Category definitions** — explicitly define what each category means rather than just listing category names
- **Chain-of-thought** — ask the model to reason about why a memory belongs to a category before outputting the final tag
- **Negative examples** — show common miscategorizations to steer the model away from them

Each variation gets measured in LMEval. You keep what improves scores, discard what doesn't.

### 4. Test across models via LMApi

Since MemoryApi routes all inference through **LMApi**, you have centralized metrics. Use LMEval's N×M matrix (prompts × models) to find the best prompt + model combination for categorization specifically. A smaller model with a well-tuned prompt might outperform a larger model with your current prompt — and LMApi's sticky model assignment means you can route categorization requests to the optimal model without affecting other workloads.

## Projects That Directly Affect This Work

| Project | How It Affects You |
|---------|-------------------|
| **LMEval** | Your evaluation harness. Without it, prompt improvements are unmeasured. Check its current state — if Quick Compare and deterministic metrics are working, that's enough to start. |
| **LMApi** | All MemoryApi inference flows through it. LMApi's metrics (latency, token counts per model) help you understand cost/quality tradeoffs for categorization. Its parallel execution endpoints let you test multiple models simultaneously. |
| **DevPlanner** | Track this work as cards. The skill eval framework in DevPlanner shares similar goals with what you're doing — evaluate prompt quality iteratively. Check if any patterns from DevPlanner's skill eval approach are reusable. |

## What to Avoid

- **Don't iterate on prompts without measurement.** This is the core ecosystem principle — measurable quality over intuition. Even a rough LMEval setup is better than manual spot-checking.
- **Don't optimize for one model.** MemoryApi goes through LMApi, and you may swap or add models over time. Prompts that are robust across models will serve you better than prompts overfit to one.
- **Don't over-engineer the prompt in isolation.** The categorization prompt works alongside summarization, tagging, and aggregation prompts. Changes to categorization may affect downstream aggregation quality. Consider evaluating them together once LMEval supports that kind of pipeline evaluation.

## Quick Win If LMEval Isn't Ready Yet

If LMEval's core eval workflows aren't stable enough to use right now, a pragmatic short-term approach:

1. Add structured JSON output to the categorization prompt (with a defined schema for categories)
2. Write a simple test script that runs ~50 sample memories through the prompt and checks output against your expected categories
3. Track accuracy as a number — even a spreadsheet beats no measurement
4. When LMEval is ready, migrate this into a proper evaluation

This follows your ecosystem's philosophy — start measuring immediately, even imperfectly, and refine the measurement tools as they mature.
