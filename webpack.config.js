var path = require('path');
var jsSrc = path.join(__dirname, '/src');
var examplesDir = path.join(__dirname, '/examples');
var testsDir = path.join(__dirname, '/tests');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    examples: examplesDir + '/index.jsx'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  devtool: 'source-map', // To support Firefox, switch to exec
  output: {
    path: path.join(__dirname, '/www'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders:  ['babel-loader'],
        include: [jsSrc, testsDir, examplesDir],
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
