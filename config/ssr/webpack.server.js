const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base')

const resolve = (...paths) => path.join(__dirname, ...paths)
module.exports = webpackMerge({}, baseConfig, {
  target: 'node',
  entry: resolve('../../src/ssr/entry-server.js'),
  output: {
    filename: 'static/js/server.bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_NEV': JSON.stringify('server'),
    }),
  ],
})
