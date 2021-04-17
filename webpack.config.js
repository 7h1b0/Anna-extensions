const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const tailwindcss = require('tailwindcss');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      main: ['./src', './src/styles.css'],
    },
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      pathinfo: !isProd,
      clean: true,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [tailwindcss],
                },
              },
            },
          ],
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
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css',
        ignoreOrder: false,
      }),
      new CopyPlugin({
        patterns: [
          { from: 'manifest.json' },
          { from: 'assets/*', context: 'src/' },
        ],
      }),
    ],
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      port: 3000,
      stats: 'errors-only',
    },
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
