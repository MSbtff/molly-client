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
<<<<<<< HEAD
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
=======

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

>>>>>>> 8a24f3a5f730f0037ef30cff7fd0b04a3ca0e3e5
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // next/headers 모킹
    '^next/headers$': '<rootDir>/__mocks__/nextHeaders.js',
  },

  testEnvironment: 'jsdom',
<<<<<<< HEAD
=======

>>>>>>> 8a24f3a5f730f0037ef30cff7fd0b04a3ca0e3e5
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

<<<<<<< HEAD
export default createJestConfig(config);


=======
export default createJestConfig(config);
>>>>>>> 8a24f3a5f730f0037ef30cff7fd0b04a3ca0e3e5
