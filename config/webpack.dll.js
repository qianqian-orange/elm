const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  mode: 'production',
  entry: {
    vendors: ['vue', 'vue-router'],
  },
  output: {
    path: path.join(__dirname, '../dist', 'dll'),
    filename: '[name].[hash:6].dll.js',
    library: '[name]_dll',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, '../dist', 'dll', 'manifest.json'),
    }),
  ],
}
