const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  reportName: "Playwright Automation Report",
  pageTitle: "BidGPT Testing",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "119",
    },
    device: "Local test machine",
    platform: {
      name: "macbook",
      version: "16",
    },
  },
  customData: {
    title: "Test Info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" }
    ],
  },
});

export{}