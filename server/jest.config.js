/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!./src/migration/**',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  //globalSetup: './src/jest.globalSetup.ts',
}
