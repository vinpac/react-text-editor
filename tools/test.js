process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

const path = require('path');
const jest = require('jest');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

argv.push('--config', JSON.stringify({
  rootDir: path.resolve('./src'),
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](build|docs|node_modules)[/\\\\]',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': path.resolve('./src/core/jest/babelTransform.js'),
    '^.+\\.css$': path.resolve('./src/core/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|css|json)$)': path.resolve('./src/core/jest/fileTransform.js'),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
}));

jest.run(argv);
