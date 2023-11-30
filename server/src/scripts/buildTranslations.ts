import fs from "fs";
import path from "path";

const sourceDir = path.join(__dirname, "../lib/i18n/locales");
const destDir = path.join(__dirname, "../../dist/lib/i18n/locales");

fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(sourceDir).forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  fs.copyFileSync(sourcePath, destPath);
});
