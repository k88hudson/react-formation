var jsSrc = __dirname + '/src';
module.exports = {
  entry: jsSrc + '/index.jsx',
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
        include: jsSrc
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader', 'jsx-loader'],
        include: jsSrc
      }
    ]
  }
};
