module.exports = {
  globalSetup: './test/setup.js',
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
    'source-map-support/register': 'identity-obj-proxy',
  },
  testTimeout: 30000,
}
