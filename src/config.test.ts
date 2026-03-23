import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { tmpdir } from "os";
import { loadConfig } from "./config";

describe("loadConfig", () => {
  let originalBasePath: string | undefined;

  beforeEach(() => {
    originalBasePath = process.env.BASE_PATH;
  });

  afterEach(() => {
    if (originalBasePath === undefined) {
      delete process.env.BASE_PATH;
    } else {
      process.env.BASE_PATH = originalBasePath;
    }
  });

  it("throws when BASE_PATH is not set", async () => {
    delete process.env.BASE_PATH;
    await expect(loadConfig()).rejects.toThrow(
      "BASE_PATH environment variable is required"
    );
  });

  it("throws when BASE_PATH is empty string", async () => {
    process.env.BASE_PATH = "";
    await expect(loadConfig()).rejects.toThrow(
      "BASE_PATH environment variable is required"
    );
  });

  it("throws when BASE_PATH directory does not exist", async () => {
    process.env.BASE_PATH = "/this/path/does/not/exist/at/all";
    await expect(loadConfig()).rejects.toThrow(
      "BASE_PATH directory does not exist"
    );
  });

  it("returns basePath and config when BASE_PATH is valid", async () => {
    // Use the real project base path since config.json is hardcoded relative to config.ts
    process.env.BASE_PATH = tmpdir();
    const result = await loadConfig();

    expect(result.basePath).toBe(tmpdir());
    expect(result.config).toBeDefined();
    expect(Array.isArray(result.config.projects)).toBe(true);
    expect(result.config.projects.length).toBeGreaterThan(0);
  });

  it("loaded config has expected project fields", async () => {
    process.env.BASE_PATH = tmpdir();
    const { config } = await loadConfig();

    for (const project of config.projects) {
      expect(typeof project.name).toBe("string");
      expect(typeof project.path).toBe("string");
      expect(typeof project.repo).toBe("string");
      expect(typeof project.description).toBe("string");
      expect(Array.isArray(project.files)).toBe(true);
    }
  });
});
