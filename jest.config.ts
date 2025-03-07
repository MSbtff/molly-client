import type { Config } from 'jest';
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

  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true }], // TypeScript ESM 지원
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx',], // TypeScript를 ESM으로 처리

  moduleNameMapper: {
    // '\\.(css|scss|png|jpg|jpeg|webp|avif|svg)$': '<rootDir>/jest-mocks/fileMock.js', // 스타일 및 이미지 무시
  },
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default createJestConfig(config);