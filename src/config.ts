import type { Config } from "./types";

export interface AppConfig {
  basePath: string;
  config: Config;
}

export async function loadConfig(): Promise<AppConfig> {
  const basePath = process.env.BASE_PATH;
  if (!basePath) {
    throw new Error(
      "BASE_PATH environment variable is required. Copy .env.example to .env and set it."
    );
  }

  const { existsSync } = await import("fs");
  if (!existsSync(basePath)) {
    throw new Error(`BASE_PATH directory does not exist: ${basePath}`);
  }

  const configPath = new URL("../config.json", import.meta.url).pathname;
  const configFile = Bun.file(configPath);
  if (!(await configFile.exists())) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  const config: Config = await configFile.json();

  if (!config.projects || !Array.isArray(config.projects)) {
    throw new Error("config.json must contain a 'projects' array");
  }

  return { basePath, config };
}
