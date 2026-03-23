# LMApi — Intelligent Ollama Router & Load Balancer

## Purpose

LMApi is the **inference foundation** of the ecosystem. It provides a unified API layer over multiple Ollama servers, enabling intelligent request routing, load balancing, and metrics collection. Every project that needs LLM capabilities routes through LMApi rather than connecting to Ollama directly.

## Key Features

- **Smart routing** with priority-based server selection and sticky model assignment to minimize loading overhead
- **Intelligent queueing** that respects model availability per server and dispatches when resources free up
- **Parallel model execution** (`/generate/batch`, `/generate/all`) for side-by-side model comparison
- **OpenAI-compatible endpoints** (`/v1/chat/completions`) with tool/function-calling pass-through
- **SSE streaming** support for completions endpoints
- **Cloud fallback via OpenRouter** for models not hosted locally
- **Complete metrics persistence** in SQLite — duration, token counts, temperature, model details for every request
- **Live dashboard** with real-time server status, prompt history, filtering/sorting, and WebSocket updates
- **Agent routes** for specialized prompt templating (summarization, title generation)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js / Bun |
| Backend | Express / Fastify |
| Database | SQLite (better-sqlite3) |
| Real-time | Socket.IO |
| Logging | Structured daily-rotation logs |

## Role in Ecosystem

LMApi is the **single point of contact** for all LLM inference across the ecosystem:

- **LMEval** dispatches all evaluation prompts through LMApi to test across models and servers
- **MemoryApi** uses LMApi for embeddings, summarization, categorization, and tagging
- **DevPlanner** skill evaluations route through Ollama (could benefit from LMApi routing)
- **Command PiDog** AI agent endpoints could leverage LMApi for multi-model fallback

By centralizing inference, LMApi provides consistent metrics, logging, and server management regardless of which project initiates the request. This makes it the natural place to measure latency, token usage, and model performance — data that feeds back into LMEval for prompt refinement.

## Relationships

| Project | Relationship |
|---------|-------------|
| **LMEval** | Primary consumer — all eval prompts dispatch through LMApi |
| **MemoryApi** | Uses LMApi for embeddings and AI-assisted memory processing |
| **DevPlanner** | Skill evals use Ollama directly; candidate for LMApi integration |
| **Command PiDog** | AI agent uses Ollama directly; candidate for LMApi multi-model routing |
