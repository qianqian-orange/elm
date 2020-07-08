const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Happypack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const resolve = (...paths) => path.join(__dirname, ...paths)

module.exports = {
  mode: 'production',
  output: {
    path: resolve('../../dist'),
    publicPath: '/elm/',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '@import "~@/scss/index.scss";',
            },
          }
        ],
        include: [resolve('../../src'), file => /normalize\.css/.test(file)],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            outputPath: 'static/font',
            name: '[name].[hash:6].[ext]',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|gif|webp|svg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            esModule: false,
            outputPath: 'static/image',
            name: '[name].[hash:6].[ext]',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Happypack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('../../public/js/*'),
          to: resolve('../../dist/static/js'),
          flatten: true,
        },
        {
          from: resolve('../../public/favicon.ico'),
          to: resolve('../../dist/favicon.ico'),
        },
      ],
    }),
    new StyleLintPlugin({
      context: resolve('../../src'),
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
    new webpack.DefinePlugin({
      PUBLICPATH: JSON.stringify('/elm/'),
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('../../dist/static/dll/manifest.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('../../src'),
    },
    extensions: ['.js', '.vue'],
    modules: [resolve('../../src'), resolve('../../node_modules')],
  },
  devtool: '#source-map',
}
