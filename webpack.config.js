const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    worker: './src/assignment/worker/worker.js',
    task: './src/assignment/task/main.js',
    performance: './src/assignment/performance/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 5757,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
