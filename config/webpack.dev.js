const webpackMerge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge({}, baseConfig, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    compress: true,
    progress: true,
    hot: true,
    clientLogLevel: 'silent',
    overlay: false,
    stats: 'minimal', // verbose minimal errors-only none normal
    contentBase: path.join(__dirname, '../server/public'),
    // contentBase: path.join(__dirname, '../dist'),
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
    proxy: {
      '/elm/api': 'http://localhost:4000',
    },
    historyApiFallback: true,
  },
  devtool: 'cheap-module-eval-source-map',
})
