module.exports = {
  testEnvironment: "node",

  testRegex: [
    "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
  ],

  setupFiles: [
    'dotenv/config'
  ],

  roots: [
    '<rootDir>/src/',
    '<rootDir>/tests/'
  ],

  transform: {
    '^.+\\.ts$': 'ts-jest'
  },

  notify: true,

  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ],
}
