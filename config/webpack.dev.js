const webpackMerge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8080,
    compress: true,
    progress: true,
    hot: true,
    clientLogLevel: 'silent',
    overlay: false,
    stats: 'minimal', // verbose minimal errors-only none normal
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
  },
  devtool: 'cheap-module-eval-source-map',
})
