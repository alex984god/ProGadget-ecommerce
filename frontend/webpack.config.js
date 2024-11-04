const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point to your application
  output: {
    filename: 'bundle.js', // Output file
    path: require.resolve('path-browserify'),
  },
  resolve: {
    fallback: {
      "zlib": false,
      "querystring": false,
      "path": false,
      "crypto": false,
      "fs": false,   // fs is not available in the browser
      "stream": false,
      "http": false,
      "url": false,
      "buffer": false,
      "util": false,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel to transpile JavaScript
      },
    ],
  },
};