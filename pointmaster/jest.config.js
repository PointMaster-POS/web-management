module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for JS and JSX files
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS files
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom', // Simulate a DOM environment for React components
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Set up additional test configurations
};
