const {compilerOptions} = require('./tsconfig.json');
const {pathsToModuleNameMapper} = require('ts-jest/utils');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};
