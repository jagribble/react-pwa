const webpack = require('webpack');

const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const dotenv = require('dotenv').config();


module.exports = {
  mode: 'production',
  plugins: [new CleanPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      title: 'Jules Gribble',
    }), new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: new RegExp('https://jules-gribble.co.uk'),
        handler: 'StaleWhileRevalidate',
      }],
    }), new webpack.DefinePlugin({
      CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
      CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN,
    })],
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
  output: {
    filename: 'build.js',
    path: `${__dirname}/public/js`,
  },
  externals: {
    fs: 'commonjs fs',
  },

};
