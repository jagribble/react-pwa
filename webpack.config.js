const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
// required for development to import all local envs
require('dotenv').config();


console.log(process.env);
module.exports = {
  mode: 'development',
  context: __dirname,
  entry: `${__dirname}/components/index.js`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader', // compiles Sass to CSS, using Node Sass by default
      ],
    }],
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true, contentImage: path.join(__dirname, 'logo.png') }),
    new CleanPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      title: 'Jules Gribble',
    }),
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: new RegExp('https://jules-gribble.co.uk'),
        handler: 'StaleWhileRevalidate',
      }],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CONTENTFUL_SPACE: JSON.stringify(process.env.CONTENTFUL_SPACE),
        CONTENTFUL_TOKEN: JSON.stringify(process.env.CONTENTFUL_TOKEN),
      },
    })],
  output: {
    filename: 'build.js',
    path: `${__dirname}/public/js`,
  },
  externals: {
    fs: 'commonjs fs',
  },

};
