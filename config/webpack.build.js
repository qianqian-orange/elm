const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('../dist', 'dll', 'manifest.json'),
    }),
  ],
  devtool: 'source-map',
})
