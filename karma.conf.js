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
      'tests/index.jsx': ['webpack', 'sourcemap'],
      'src/lib/validations.js': ['webpack', 'coverage']
    },
    reporters: ['mocha'],
    coverageReporter: {
      type: 'lcov',
      dir: 'www/coverage/'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: webpackConfig.module.loaders,
        postLoaders: [{
          test: /\.js$/,
          loader: 'istanbul-instrumenter',
          include: [__dirname + '/src']
        }]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
