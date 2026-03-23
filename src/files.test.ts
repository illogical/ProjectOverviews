import { describe, it, expect, beforeEach, afterEach, spyOn } from "bun:test";
import { join } from "path";
import { tmpdir } from "os";
import { mkdtemp, rm } from "fs/promises";
import { resolveProject, resolveAllProjects } from "./files";
import type { ProjectConfig } from "./types";

const makeProject = (overrides?: Partial<ProjectConfig>): ProjectConfig => ({
  name: "TestProject",
  path: "test-project",
  repo: "https://github.com/test/test-project",
  description: "A test project",
  files: [],
  ...overrides,
});

describe("resolveProject", () => {
  let tmpDir: string;
  let projectDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "project-overviews-test-"));
    projectDir = join(tmpDir, "test-project");
    await Bun.write(join(projectDir, ".keep"), ""); // creates the directory
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("returns empty files and missingFiles for a project with no configured files", async () => {
    const result = await resolveProject(tmpDir, makeProject({ files: [] }));
    expect(result.files).toHaveLength(0);
    expect(result.missingFiles).toHaveLength(0);
  });

  it("resolves a file that exists", async () => {
    const content = "# Hello World";
    await Bun.write(join(projectDir, "README.md"), content);

    const result = await resolveProject(
      tmpDir,
      makeProject({ files: ["README.md"] })
    );

    expect(result.files).toHaveLength(1);
    expect(result.missingFiles).toHaveLength(0);
    expect(result.files[0].relativePath).toBe("README.md");
    expect(result.files[0].content).toBe(content);
    expect(result.files[0].projectName).toBe("TestProject");
    expect(result.files[0].absolutePath).toBe(join(projectDir, "README.md"));
  });

  it("tracks a missing file in missingFiles", async () => {
    const warnSpy = spyOn(console, "warn").mockImplementation(() => {});

    const result = await resolveProject(
      tmpDir,
      makeProject({ files: ["MISSING.md"] })
    );

    expect(result.files).toHaveLength(0);
    expect(result.missingFiles).toHaveLength(1);
    expect(result.missingFiles[0]).toBe("MISSING.md");
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("TestProject/MISSING.md")
    );

    warnSpy.mockRestore();
  });

  it("correctly splits found and missing files", async () => {
    const warnSpy = spyOn(console, "warn").mockImplementation(() => {});
    await Bun.write(join(projectDir, "README.md"), "# Present");

    const result = await resolveProject(
      tmpDir,
      makeProject({ files: ["README.md", "NOTHERE.md", "docs/api.md"] })
    );

    expect(result.files).toHaveLength(1);
    expect(result.files[0].relativePath).toBe("README.md");
    expect(result.missingFiles).toEqual(["NOTHERE.md", "docs/api.md"]);

    warnSpy.mockRestore();
  });

  it("includes project config on the returned object", async () => {
    const project = makeProject();
    const result = await resolveProject(tmpDir, project);
    expect(result.config).toBe(project);
  });
});

describe("resolveAllProjects", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "project-overviews-test-"));
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("returns an array with one result per project", async () => {
    const logSpy = spyOn(console, "log").mockImplementation(() => {});

    const projects = [
      makeProject({ name: "Alpha", path: "alpha" }),
      makeProject({ name: "Beta", path: "beta" }),
    ];

    // Create project dirs
    await Bun.write(join(tmpDir, "alpha", ".keep"), "");
    await Bun.write(join(tmpDir, "beta", ".keep"), "");

    const results = await resolveAllProjects(tmpDir, projects);

    expect(results).toHaveLength(2);
    expect(results[0].config.name).toBe("Alpha");
    expect(results[1].config.name).toBe("Beta");

    logSpy.mockRestore();
  });

  it("returns empty array for empty projects list", async () => {
    const logSpy = spyOn(console, "log").mockImplementation(() => {});
    const results = await resolveAllProjects(tmpDir, []);
    expect(results).toHaveLength(0);
    logSpy.mockRestore();
  });
});
