#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { exec } = require("child_process");
const questions = require("./questions");

(async () => {
  const { targets, ...config } = await prompts(questions);

  fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config, null, 2));

  exec(
    `npx pkg -t ${targets.join(
      ","
    )} --out-path=${process.cwd()} merge-files.js`,
    { cwd: __dirname },
    (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
      } else {
        console.log("Executable merge-files generated successfully");
      }
    }
  );
})();
