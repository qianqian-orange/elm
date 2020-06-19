const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const resolve = (...paths) => path.resolve(__dirname, ...paths)

module.exports = {
  entry: resolve('../src/index.js'),
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[hash:6].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '@import "~@/scss/index.scss";',
            },
          },
        ],
        include: [path.join(__dirname, '../src'), file => /normalize\.css/.test(file)],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      favicon: resolve('../public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[hash:6].css',
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('../public/js/*'),
          to: resolve('../dist/js'),
          flatten: true,
        },
      ],
    }),
    // new AddAssetHtmlPlugin({
    //   outputPath: 'js',
    //   publicPath: '/js/',
    //   filepath: resolve('../public', 'js', '*.js'),
    //   typeOfAsset: 'js',
    // }),
  ],
  resolve: {
    alias: {
      '@': resolve('../src'),
    },
    extensions: ['.js', '.vue'],
    modules: [resolve('../src'), resolve('../node_modules')],
  },
}
