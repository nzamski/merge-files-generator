const fs = require("fs");
const path = require("path");
const glob = require("glob");

const baseDir = !!process.pkg ? path.dirname(process.execPath) : __dirname;

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
);

const globPattern = config.globPattern || "**/*";
const outputFileName = config.outputFileName || "output.txt";
const filteringMethod = config.filteringMethod || null;
const filesList = new Set(config.filesList?.map((file) => file.toLowerCase()));

const SEPARATOR =
  "-----------------------------------------------------------------------------------------";

const foundFiles = glob.sync(
  path.join(baseDir, globPattern).replace(/\\/g, "/"),
  { absolute: true }
);

if (!foundFiles.length) {
  console.error("No matching files found");
  return;
}

const outputPath = path.resolve(baseDir, outputFileName);
fs.writeFileSync(outputPath, "");

foundFiles
  .filter((file) => {
    const baseName = path.basename(file).toLowerCase();

    return (
      (filteringMethod === "whitelist"
        ? filesList.has(baseName)
        : filteringMethod === "blacklist"
        ? !filesList.has(baseName)
        : true) && baseName !== outputFileName.toLowerCase()
    );
  })
  .forEach((file) => {
    fs.appendFileSync(
      outputPath,
      `${SEPARATOR}\n` +
        `// ${path.relative(baseDir, file)} File:\n` +
        `${SEPARATOR}\n` +
        `${fs.readFileSync(file, "utf8")}\n\n`
    );
  });

console.log(`Merged files into ${path.relative(baseDir, outputPath)}`);
