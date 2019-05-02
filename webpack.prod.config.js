const webpack = require('webpack');

const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

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
    }), new webpack.DefinePlugin(envKeys)],
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
