import * as fs from "fs";
import * as path from "path";

function createDirectoryIfNotExists(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function copyFiles(sourceDir: string, destinationDir: string) {
  createDirectoryIfNotExists(destinationDir);

  // Get a list of files in the source directory
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const sourceFilePath = path.join(sourceDir, file);
    const destinationFilePath = path.join(destinationDir, file);

    // Copy the file
    fs.copyFileSync(sourceFilePath, destinationFilePath);
  }

  console.log("Files copied successfully.");
}

// Usage example:
const sourceDir = path.resolve(process.argv[2]);
const destinationDir = path.resolve(process.argv[3]);

if (!sourceDir || !destinationDir) {
  console.error("Usage: node copyFiles.js sourceDir destinationDir");
  process.exit(1);
}

copyFiles(sourceDir, destinationDir);
