var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests/index.jsx'
    ],
    preprocessors: {
      'tests/index.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage', 'coveralls'],
    coverageReporter: {
      type: 'lcov',
      dir: 'www/coverage/'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module
    },
    webpackServer: {
      noInfo: true
    }
  });
};
