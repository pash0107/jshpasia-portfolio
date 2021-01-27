const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry : [
    './src/sass/main.scss',
    './src/js/main.js'
  ],

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true }},
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: 'sass-loader', options: { 
            sourceMap: true,
            includePaths: [path.resolve(__dirname, 'node_modules')]
          }}
        ]
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new MiniCssExtractPlugin({ filename: 'css/main.css' }),
    new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: true }}}),
    new CopyWebpackPlugin([{from: './src/images', to: 'images'}]),
    new webpack.ProvidePlugin({
      '$' : 'jquery',
      'jQuery' : 'jquery'
    })
  ],

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin({ sourceMap: true })]
  }
}