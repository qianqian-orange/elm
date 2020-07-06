const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')

const resolve = (...paths) => path.resolve(__dirname, ...paths)

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('../server/public', 'dll', 'manifest.json'),
    }),
  ],
  devtool: 'source-map',
})
