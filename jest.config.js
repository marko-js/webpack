module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: `/__tests__/[^./]+\\.ts$`,
  coveragePathIgnorePatterns: ["/__tests__/"],
};
