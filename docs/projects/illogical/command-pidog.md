# Command PiDog — Robot Dog API with AI Agent Integration

## Purpose

Command PiDog is a REST + WebSocket API for controlling a SunFounder PiDog robot dog from a Raspberry Pi. It exposes 30+ robot actions, sensor data, camera streaming, and an AI agent endpoint that converts natural language commands into robot actions — making it a tangible, physical demonstration of AI agent capabilities.

## Key Features

- **30 robot actions** — movement, posture, expressions, social behaviors, idle animations
- **REST API** — full control over servos, sensors, RGB lighting, and sound
- **WebSocket streaming** — real-time sensor data (5 Hz), action status, and log broadcasting
- **AI agent endpoint** — natural language → LLM → action execution with Ollama and OpenRouter support
- **Camera streaming** — MJPEG live feed with start/stop/snapshot controls
- **Voice commands** — audio → STT (Whisper) → LLM → action pipeline
- **Safety limits** — servo angle constraints, battery cutoff, rate limiting
- **Tailscale** — private HTTPS access across the network
- **Mock mode** — develop without physical hardware

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Python 3.11+ |
| Backend | FastAPI + Uvicorn |
| Hardware | SunFounder PiDog (I2C/GPIO/SPI) |
| AI | Ollama / OpenRouter |
| Audio | Whisper STT + pygame |
| Network | Tailscale (Docker) |

## Role in Ecosystem

Command PiDog demonstrates the ecosystem's AI agent capabilities in a **physical, interactive context**. While most projects focus on software development workflows, PiDog shows that the same patterns — natural language understanding, structured API calls, real-time feedback — apply to hardware control. It's also a platform for experimenting with:

- **Local LLM agent quality** — how well can small Ollama models translate intent into correct API calls?
- **Skill prompt refinement** — the agent skill document is a candidate for LMEval evaluation
- **Voice interaction patterns** — audio → STT → LLM → action is a pipeline that benefits from prompt optimization

## Relationships

| Project | Relationship |
|---------|-------------|
| **PiDog Web** | Frontend companion — the React app that provides the control interface |
| **LMApi** | Agent endpoint uses Ollama directly; candidate for LMApi multi-model routing |
| **LMEval** | Agent skill prompt is a candidate for systematic evaluation |
