require('webpack');

// required for development to import all local envs
require('dotenv').config();


// console.log(process.env);
module.exports = {
  mode: 'production',
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
