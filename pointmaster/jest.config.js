module.exports = {
  // Tell Jest to use Babel for transformation
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Ignore transformations in node_modules except for Ant Design
  transformIgnorePatterns: [
    "node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime)"
  ],
  // Set up test environment
  testEnvironment: "jsdom",
  // Resolve .js and .jsx extensions
  moduleFileExtensions: ["js", "jsx"],
  // Handle CSS imports
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
