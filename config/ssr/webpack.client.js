const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseConfig = require('./webpack.base')

const resolve = (...paths) => path.join(__dirname, ...paths)
module.exports = webpackMerge({}, baseConfig, {
  entry: {
    app: resolve('../../src/ssr/entry-client.js'),
  },
  output: {
    filename: 'static/js/[name].[hash:6].js',
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify('client'),
    }),
  ],
})
