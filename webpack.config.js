var jsSrc = __dirname + '/src';
var examples = __dirname + '/examples';
module.exports = {
  entry: examples + '/index.jsx',
  devtool: 'source-map', // To support Firefox, switch to exec
  output: {
    path: __dirname + '/www',
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders:  ['babel-loader'],
        include: [jsSrc, examples]
      },
      {
        test: /\.md$/,
        loaders:  ['raw-loader']
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader', 'jsx-loader'],
        include: [jsSrc, examples]
      }
    ]
  }
};
