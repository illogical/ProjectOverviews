import { resolve } from "path";
import { loadConfig } from "./config";
import { resolveAllProjects } from "./files";
import { writeIndex } from "./index-generator";

async function main() {
  console.log("🚀 ProjectOverviews — Generating ecosystem index\n");

  const { basePath, config } = await loadConfig();
  console.log(`📁 Base path: ${basePath}`);
  console.log(`📋 Projects configured: ${config.projects.length}\n`);

  const projects = await resolveAllProjects(basePath, config.projects);

  const outputDir = resolve(config.outputDir);
  const outputPath = await writeIndex(outputDir, projects);

  const totalFiles = projects.reduce((sum, p) => sum + p.files.length, 0);
  const totalMissing = projects.reduce((sum, p) => sum + p.missingFiles.length, 0);

  console.log("\n✅ Index generated successfully");
  console.log(`   📄 Output: ${outputPath}`);
  console.log(`   📊 ${projects.length} projects, ${totalFiles} files resolved`);
  if (totalMissing > 0) {
    console.log(`   ⚠️  ${totalMissing} files missing`);
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
