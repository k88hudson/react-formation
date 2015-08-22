var jsSrc = __dirname + '/src';
var examplesDir = __dirname + '/examples';
var testsDir = __dirname + '/tests';

var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    examples: examplesDir + '/index.jsx'
  },
  devtool: 'source-map', // To support Firefox, switch to exec
  output: {
    path: __dirname + '/www',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders:  ['babel-loader'],
        include: [jsSrc, testsDir, examplesDir]
      },
      {
        test: /\.md$/,
        loaders:  ['raw-loader']
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader', 'jsx-loader'],
        include: [jsSrc, testsDir, examplesDir]
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin()
  ]
};
