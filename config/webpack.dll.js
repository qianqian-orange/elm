const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  mode: 'production',
  entry: {
    vendors: ['vue', 'vue-router', 'vuex', 'axios'],
  },
  output: {
    path: path.join(__dirname, '../server/public/static/dll'),
    filename: '[name].[hash:6].dll.js',
    library: '[name]_dll',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, '../server/public/static/dll/manifest.json'),
    }),
  ],
}
