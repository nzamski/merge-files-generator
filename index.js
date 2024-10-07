#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { exec } = require("pkg");
const questions = require("./questions");

(async () => {
  const { targets, ...config } = await prompts(questions);

  fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config, null, 2));

  exec([
    path.resolve(__dirname, 'merge-files.js'),
    '--out-path', process.cwd(),
    '-t', targets.join(',')
  ])
    .then(() => {
      console.log("Executable merge-files generated successfully");
    })
    .catch((error) => {
      console.error(`exec error: ${error}`);
    });
})();
