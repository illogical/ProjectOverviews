import { join } from "path";
import { mkdir } from "fs/promises";
import type { ResolvedProject } from "./types";

export function generateIndex(projects: ResolvedProject[]): string {
  const timestamp = new Date().toISOString();
  const lines: string[] = [];

  lines.push("# Project Ecosystem Index");
  lines.push("");
  lines.push(`> Auto-generated on ${timestamp}`);
  lines.push("");
  lines.push("## Table of Contents");
  lines.push("");

  for (const project of projects) {
    const anchor = project.config.name.toLowerCase().replace(/\s+/g, "-");
    lines.push(`- [${project.config.name}](#${anchor})`);
  }

  lines.push("");
  lines.push("---");
  lines.push("");

  for (const project of projects) {
    lines.push(`## ${project.config.name}`);
    lines.push("");
    lines.push(`> ${project.config.description}`);
    lines.push("");
    lines.push(`**Repository:** [${project.config.repo}](${project.config.repo})`);
    lines.push("");

    if (project.files.length > 0) {
      lines.push("### Included Files");
      lines.push("");
      for (const file of project.files) {
        lines.push(`- [${file.relativePath}](${file.absolutePath})`);
      }
      lines.push("");
    }

    if (project.missingFiles.length > 0) {
      lines.push("### Missing Files");
      lines.push("");
      for (const missing of project.missingFiles) {
        lines.push(`- ⚠️ ${missing}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  // Summary stats
  const totalFiles = projects.reduce((sum, p) => sum + p.files.length, 0);
  const totalMissing = projects.reduce((sum, p) => sum + p.missingFiles.length, 0);

  lines.push("## Summary");
  lines.push("");
  lines.push(`- **Projects:** ${projects.length}`);
  lines.push(`- **Files resolved:** ${totalFiles}`);
  if (totalMissing > 0) {
    lines.push(`- **Files missing:** ${totalMissing}`);
  }
  lines.push(`- **Generated:** ${timestamp}`);
  lines.push("");

  return lines.join("\n");
}

export async function writeIndex(
  outputDir: string,
  projects: ResolvedProject[]
): Promise<string> {
  await mkdir(outputDir, { recursive: true });

  const content = generateIndex(projects);
  const outputPath = join(outputDir, "index.md");
  await Bun.write(outputPath, content);

  return outputPath;
}
