const questions = [
  {
    type: "text",
    name: "globPattern",
    message: "Specify glob pattern for files to merge",
    initial: "**/*",
  },
  {
    type: "text",
    name: "outputFileName",
    message: "Specify output filename",
    initial: "output.txt",
  },
  {
    type: "select",
    name: "filteringMethod",
    message: "What files filtering method do you want to use?",
    choices: [
      { title: "No", value: null },
      { title: "Blacklist", value: "blacklist" },
      { title: "Whitelist", value: "whitelist" },
    ],
  },
  {
    type: (prev) => (prev ? "list" : null),
    name: "filesList",
    message: "List comma-separated filenames for filtering (case-insensitive)",
    separator: ",",
  },
  {
    type: "multiselect",
    name: "targets",
    message: "Select target machines",
    choices: [
      { title: "win-x64", value: "node18-win-x64", selected: true },
      { title: "macos-x64", value: "node18-macos-x64" },
      { title: "macos-arm64", value: "node18-macos-arm64" },
      { title: "linux-x64", value: "node18-linux-x64" },
      { title: "linux-arm64", value: "node18-linux-arm64" },
    ],
  },
];

module.exports = questions;
