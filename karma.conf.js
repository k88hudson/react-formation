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
      'src/**/*.js*': ['webpack', 'coverage']
    },
    reporters: ['mocha'],
    coverageReporter: {
      type: 'lcovonly',
      dir: 'www/coverage/'
      // This is not working for jsx right now....
      // Maybe try https://github.com/deepsweet/isparta-loader?
      // instrumenters: { 'istanbul-react': require('istanbul-react') },
      //  instrumenter: {
      //    'src/**/*.js*': 'istanbul-react'
      //  },
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
