# SplitDiff — Browser-Based Diff Viewer

## Purpose

SplitDiff is a lightweight, zero-dependency diff viewer that runs entirely in the browser. Originally built as a standalone tool for quick file comparisons, it served as a **proof of concept** whose diff rendering approach was later incorporated into DevPlanner's artifact file management system.

## Key Features

- **Side-by-side diffs** with syntax highlighting and automatic language detection
- **100% client-side** — files never leave the machine; no server, no uploads
- **Multiple input methods** — drag & drop, paste, or file picker
- **Tab management** — multiple diff comparisons with localStorage persistence
- **Hunk navigation** — jump between changes with keyboard shortcuts
- **Search within diff** — find text with next/previous navigation
- **Collapse unchanged regions** — focus on what actually changed
- **Ignore whitespace** — filter formatting noise
- **Scroll sync** — panes stay aligned during navigation
- **Zero dependencies** — pure JavaScript, no frameworks, no build step

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Vanilla JavaScript |
| Styling | CSS |
| Storage | localStorage |
| Dependencies | None |

## Role in Ecosystem

SplitDiff's primary contribution to the ecosystem was as a **proving ground** for diff viewer UX patterns. The side-by-side comparison, word-level highlighting, and hunk navigation patterns developed here were refined and incorporated into DevPlanner's Diff Viewer component — where they serve the artifact file management workflow (comparing staged/unstaged/committed versions of implementation plans).

As a standalone tool, SplitDiff remains useful for quick ad-hoc comparisons without requiring a full IDE or project setup.

## Relationships

| Project | Relationship |
|---------|-------------|
| **DevPlanner** | Foundation — diff viewer patterns from SplitDiff were adopted into DevPlanner's artifact Diff Viewer |
