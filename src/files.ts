import { join } from "path";
import type { ProjectConfig, ResolvedFile, ResolvedProject } from "./types";

export async function resolveProject(
  basePath: string,
  project: ProjectConfig
): Promise<ResolvedProject> {
  const projectDir = join(basePath, project.path);
  const resolved: ResolvedFile[] = [];
  const missing: string[] = [];

  for (const filePath of project.files) {
    const absolutePath = join(projectDir, filePath);
    const file = Bun.file(absolutePath);

    if (await file.exists()) {
      const content = await file.text();
      resolved.push({
        projectName: project.name,
        relativePath: filePath,
        absolutePath,
        content,
      });
    } else {
      missing.push(filePath);
      console.warn(`  ⚠ Missing: ${project.name}/${filePath}`);
    }
  }

  return {
    config: project,
    files: resolved,
    missingFiles: missing,
  };
}

export async function resolveAllProjects(
  basePath: string,
  projects: ProjectConfig[]
): Promise<ResolvedProject[]> {
  const results: ResolvedProject[] = [];

  for (const project of projects) {
    console.log(`📂 Resolving: ${project.name}`);
    const resolved = await resolveProject(basePath, project);
    results.push(resolved);
  }

  return results;
}
