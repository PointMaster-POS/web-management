module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime|axios)"
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
