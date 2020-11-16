module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/types/**/*'
  ],
  coverageReporters: [
    "html",
    "text-summary"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node'
};