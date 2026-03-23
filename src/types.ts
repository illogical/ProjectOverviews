export interface ProjectConfig {
  name: string;
  path: string;
  repo: string;
  description: string;
  files: string[];
}

export interface Config {
  outputDir: string;
  projects: ProjectConfig[];
}

export interface ResolvedFile {
  projectName: string;
  relativePath: string;
  absolutePath: string;
  content: string;
}

export interface ResolvedProject {
  config: ProjectConfig;
  files: ResolvedFile[];
  missingFiles: string[];
}
