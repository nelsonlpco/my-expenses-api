module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: [
    "**/*.steps.js"
  ]
};

