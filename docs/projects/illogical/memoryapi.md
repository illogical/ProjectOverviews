# MemoryApi — Long-Term Semantic Memory for AI Agents

## Purpose

MemoryApi is the **second brain** of the ecosystem. It provides AI assistants and agents with long-term, semantic memory that persists across conversations and context windows. By combining vector embeddings, graph relationships, and structured SQL storage, it enables agents to remember, retrieve, and synthesize knowledge over time — turning stateless interactions into contextually rich collaboration.

## Key Features

- **Semantic memory storage** — memories stored as vector embeddings for efficient similarity search
- **RAG architecture** — retrieval-augmented generation with Qdrant vector database
- **Automatic categorization & tagging** — LLM-driven classification using prompt templates
- **Context synthesis** — post-retrieval aggregation strategies (linear, cluster, hybrid) that transform raw search results into structured narratives for LLM consumption
- **Multiple database backends:**
  - **Qdrant** — vector storage for semantic search
  - **SQLite** — revisions, audit logs, relational integrity
  - **Neo4j** (optional) — graph database for relationship-driven queries
- **Configurable LLM providers** — LM Studio, Ollama, or LMApi for embeddings and inference
- **MCP-optimized output** — structured for tool use by AI agents (narrative + bullets format)
- **Prompt templates** — configurable prompts for categorization, tagging, and aggregation
- **RESTful API** — full CRUD for memories plus search, statistics, and category/tag endpoints

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Backend | Express.js |
| Vector DB | Qdrant |
| SQL DB | SQLite |
| Graph DB | Neo4j (optional) |
| Embeddings | LM Studio / Ollama / LMApi |

## Role in Ecosystem

MemoryApi is the **knowledge persistence layer** that enables continuity across the ecosystem:

- **AI agents** gain long-term context about the user's preferences, project history, and past decisions
- **DevPlanner** could leverage MemoryApi to provide context-aware suggestions when agents work on tasks
- **Future autonomous loops** need memory to track what was tried, what worked, and what to try next

This is also one of the most **prompt-dependent** projects in the ecosystem — every memory operation involves LLM calls for summarization, categorization, tagging, and aggregation. Each of these prompts is a candidate for systematic refinement through LMEval. Until LMEval can provide measurable feedback on prompt changes, improving MemoryApi's AI-driven features is largely guesswork.

The multi-database architecture (vector + graph + SQL) presents unique challenges around result merging and re-ranking — an active area of learning and experimentation.

## Relationships

| Project | Relationship |
|---------|-------------|
| **LMApi** | Uses LMApi for embeddings, summarization, categorization, and tagging |
| **LMEval** | Strongly blocked — all prompts need measurable refinement via LMEval |
| **DevPlanner** | Could provide project/task context to agents via memory retrieval |
| **Future AI Agents** | Primary consumer — gives agents persistent memory across sessions |
