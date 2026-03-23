import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { tmpdir } from "os";
import { mkdtemp, rm } from "fs/promises";
import { generateIndex, writeIndex } from "./index-generator";
import type { ResolvedProject } from "./types";

const makeProject = (overrides?: Partial<ResolvedProject>): ResolvedProject => ({
  config: {
    name: "My Project",
    path: "my-project",
    repo: "https://github.com/user/my-project",
    description: "A sample project for testing.",
    files: [],
  },
  files: [],
  missingFiles: [],
  ...overrides,
});

const makeFile = (relativePath: string, content = "# Content") => ({
  projectName: "My Project",
  relativePath,
  absolutePath: `/base/my-project/${relativePath}`,
  content,
});

describe("generateIndex", () => {
  it("includes the main heading", () => {
    const output = generateIndex([]);
    expect(output).toContain("# Project Ecosystem Index");
  });

  it("includes the Table of Contents heading", () => {
    const output = generateIndex([makeProject()]);
    expect(output).toContain("## Table of Contents");
  });

  it("generates correct TOC anchor for a simple name", () => {
    const output = generateIndex([makeProject()]);
    expect(output).toContain("[My Project](#my-project)");
  });

  it("generates correct TOC anchor for multi-word names", () => {
    const project = makeProject({
      config: {
        name: "Command PiDog",
        path: "command-pidog",
        repo: "https://github.com/user/command-pidog",
        description: "Robot dog API.",
        files: [],
      },
    });
    const output = generateIndex([project]);
    expect(output).toContain("[Command PiDog](#command-pidog)");
  });

  it("includes project description in blockquote", () => {
    const output = generateIndex([makeProject()]);
    expect(output).toContain("> A sample project for testing.");
  });

  it("includes project repository link", () => {
    const output = generateIndex([makeProject()]);
    expect(output).toContain(
      "[https://github.com/user/my-project](https://github.com/user/my-project)"
    );
  });

  it("includes included files section when files are present", () => {
    const project = makeProject({
      files: [makeFile("README.md")],
    });
    const output = generateIndex([project]);
    expect(output).toContain("### Included Files");
    expect(output).toContain("README.md");
  });

  it("omits included files section when no files are present", () => {
    const output = generateIndex([makeProject()]);
    expect(output).not.toContain("### Included Files");
  });

  it("includes missing files section when files are missing", () => {
    const project = makeProject({ missingFiles: ["MISSING.md"] });
    const output = generateIndex([project]);
    expect(output).toContain("### Missing Files");
    expect(output).toContain("MISSING.md");
  });

  it("omits missing files section when no files are missing", () => {
    const output = generateIndex([makeProject()]);
    expect(output).not.toContain("### Missing Files");
  });

  it("shows correct project count in summary", () => {
    const output = generateIndex([makeProject(), makeProject()]);
    expect(output).toContain("**Projects:** 2");
  });

  it("shows correct resolved file count in summary", () => {
    const project = makeProject({
      files: [makeFile("README.md"), makeFile("docs/api.md")],
    });
    const output = generateIndex([project]);
    expect(output).toContain("**Files resolved:** 2");
  });

  it("shows missing file count in summary only when files are missing", () => {
    const withMissing = makeProject({ missingFiles: ["X.md", "Y.md"] });
    const withoutMissing = makeProject();

    expect(generateIndex([withMissing])).toContain("**Files missing:** 2");
    expect(generateIndex([withoutMissing])).not.toContain("**Files missing:**");
  });

  it("handles empty projects array", () => {
    const output = generateIndex([]);
    expect(output).toContain("**Projects:** 0");
    expect(output).toContain("**Files resolved:** 0");
  });

  it("includes a generation timestamp", () => {
    const output = generateIndex([]);
    expect(output).toMatch(/Auto-generated on \d{4}-\d{2}-\d{2}T/);
  });
});

describe("writeIndex", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "project-overviews-write-test-"));
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("writes index.md to the output directory", async () => {
    const outputDir = join(tmpDir, "output");
    const outputPath = await writeIndex(outputDir, []);

    expect(outputPath).toBe(join(outputDir, "index.md"));
    const file = Bun.file(outputPath);
    expect(await file.exists()).toBe(true);
  });

  it("creates the output directory if it does not exist", async () => {
    const outputDir = join(tmpDir, "nested", "output", "dir");
    await writeIndex(outputDir, []);

    const file = Bun.file(join(outputDir, "index.md"));
    expect(await file.exists()).toBe(true);
  });

  it("written file contains expected content", async () => {
    const outputDir = join(tmpDir, "output");
    const project = makeProject({ files: [makeFile("README.md")] });
    await writeIndex(outputDir, [project]);

    const content = await Bun.file(join(outputDir, "index.md")).text();
    expect(content).toContain("# Project Ecosystem Index");
    expect(content).toContain("My Project");
  });
});
