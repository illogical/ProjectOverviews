# PiDog Web — Mobile-First Robot Control Frontend

## Purpose

PiDog Web is the mobile-first React frontend for controlling the PiDog robot dog. Voice control is the hero feature: hold the mic button, speak a natural language command, and watch the robot respond. The app also provides manual controls, live camera feed, real-time sensor dashboards, and log streaming.

## Key Features

- **Voice control** — push-to-talk with silence detection, WAV encoding, and animated feedback states
- **Manual control panel** — D-pad with hold-to-repeat, 30-action grid color-coded by body part, servo sliders, RGB control
- **Live camera** — MJPEG stream display with start/stop/snapshot controls
- **Sensor dashboard** — real-time battery, distance, IMU, and touch state visualization at 5 Hz via WebSocket
- **Log viewer** — live log stream, color-coded by level, filterable, with auto-scroll toggle
- **Agent chat** — text-based AI chat panel for command execution
- **Emergency stop** — sticky banner on every screen for immediate halt

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 7 |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Routing | React Router v7 |
| Tests | Vitest + React Testing Library |

## Role in Ecosystem

PiDog Web demonstrates the **frontend patterns** used across the ecosystem (React + Vite + TypeScript + Zustand + Tailwind) applied to a real-time, interaction-heavy use case. The voice → STT → LLM → action pipeline is a concrete example of the kind of AI integration that benefits from prompt refinement and model evaluation.

## Relationships

| Project | Relationship |
|---------|-------------|
| **Command PiDog** | Backend companion — PiDog Web consumes all REST and WebSocket endpoints |
| **LMEval** | Voice/agent prompts are candidates for evaluation |
| **DevPlanner** | Shares similar frontend stack (React, Vite, TypeScript, Zustand) |
