const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); 

module.exports = {
  mode: 'development',
  watch: true,
  entry: ['./src/index.tsx'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'app.js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      reportFiles: ['**/*.{ts,tsx}', '!src/skip.ts']
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    liveReload: true,
    port: 9000,
    historyApiFallback: true,
    writeToDisk: true,
  },
};
