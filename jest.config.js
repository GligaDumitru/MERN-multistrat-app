module.exports = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/config",
    "src/server.js",
    "tests",
  ],
  coverageReporters: ["text", "lcov", "clover", "html"],
};
