var jsSrc = __dirname + '/src';
var examples = __dirname + '/examples';
var tests = __dirname + '/tests';

module.exports = {
  entry: {
    examples: examples + '/index.jsx',
    tests: tests + '/index.jsx'
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
        include: [jsSrc, tests, examples]
      },
      {
        test: /\.md$/,
        loaders:  ['raw-loader']
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader', 'jsx-loader'],
        include: [jsSrc, tests, examples]
      }
    ]
  }
};
