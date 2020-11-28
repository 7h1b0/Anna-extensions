const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ prod = false } = {}) => {
  return {
    mode: prod ? 'production' : 'development',
    entry: {
      main: './src',
    },
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      pathinfo: !prod,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'manifest.json' },
          { from: 'assets/*', context: 'src/' },
        ],
      }),
      // new CleanWebpackPlugin({
      //   verbose: true,
      // }),
    ],
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      port: 3000,
      stats: 'errors-only',
    },
    bail: true,
    node: false,
    stats: {
      colors: true,
      assets: true,
      cached: false,
      chunks: false,
      children: false,
      modules: false,
      hash: false,
      version: false,
      timings: true,
      warnings: true,
      errors: true,
      errorDetails: true,
      builtAt: false,
      entrypoints: false,
    },
  };
};
