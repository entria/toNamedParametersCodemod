const pkg = require('./package');

module.exports = {
  name: pkg.name,
  displayName: pkg.name,
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  resetModules: false,
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
};
