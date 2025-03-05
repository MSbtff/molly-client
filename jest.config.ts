// /** @type {import('ts-jest').JestConfigWithTsJest} **/

// // import type { Config } from 'jest';
// // import '@testing-library/jest-dom';

// // const config: Config = {
// //   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // ✅ Jest 실행 전에 setup 파일 로드
// //   preset: 'ts-jest',
// //   testEnvironment: 'node',
// // };

// // export default config;


// module.exports = {
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     preset: 'ts-jest',
//     testEnvironment: "node",
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
//   };

import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default createJestConfig(config);