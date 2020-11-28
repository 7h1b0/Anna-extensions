module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    url: 'http://anna.lan/',
  },
  automock: false,
  clearMocks: true,
  errorOnDeprecated: true,
};
