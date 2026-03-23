# SourceManager — Git Operations & Server Lifecycle API

## Purpose

SourceManager provides a secure, authenticated HTTP API for managing Git operations and development server processes. It's designed to be called by AI agents on remote machines — enabling them to pull the latest code, switch branches, restart servers, and verify changes are live — without needing direct SSH access or local resources beyond what's needed to make API calls.

## Key Features

- **Git update workflow** — clean-tree check → fetch → checkout → pull (ff-only) → install → restart → health check
- **Server lifecycle management** — start, stop, restart dev servers with process state persistence
- **Token authentication** — all mutation endpoints require `X-DevServer-Token` header
- **Allowlisted repositories** — only pre-configured projects can be managed
- **Auto-detection** — package manager detection from lockfiles, install-only-if-needed logic
- **Health checking** — ping or full JSON verification after updates
- **Dry run mode** — preview what an update would do without mutations
- **Structured logging** — daily-rotated NDJSON request and operation logs
- **Process safety** — one server per port, stale PID detection, auto-kill on port conflict
- **OpenAPI spec** — served live at `/swagger` for agent tooling

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Backend | Elysia |
| Config | JSON file-based |
| Logging | NDJSON daily rotation |

## Role in Ecosystem

SourceManager is the **deployment bridge** that closes the loop between code changes and visible results:

1. An AI agent (running on any machine) writes code changes in a branch
2. The agent calls SourceManager to pull the branch on the dev server
3. SourceManager runs install (if needed), restarts the server, and health-checks
4. Hot reload displays the changes immediately on the dev server

This workflow means **the agent's hardware doesn't matter** — it can be a lightweight machine or cloud instance that clones a repo, makes changes, pushes a branch, and then tells SourceManager to deploy. The dev server handles the heavy lifting of running the application.

## Relationships

| Project | Relationship |
|---------|-------------|
| **DevPlanner** | Manages Git operations for projects tracked in DevPlanner; agent workflow: claim card → implement → push → SourceManager deploys |
| **LMApi** | Could be a managed project — SourceManager restarts LMApi when code changes |
| **LMEval** | Could be a managed project for automated deployment |
| **OpenClaw** | Originally built for OpenClaw AI agent to handle Git workflows |
