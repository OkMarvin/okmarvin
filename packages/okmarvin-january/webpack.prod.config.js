const path = require('path')
const nodeExternals = require('webpack-node-externals')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const JsxstyleLoaderPlugin = require('jsxstyle-loader/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssoWebpackPlugin = require('csso-webpack-plugin').default
const fs = require('fs')
const { readdirSync } = fs
const templates = path.resolve(__dirname, 'src', 'templates')
const ManifestPlugin = require('webpack-manifest-plugin')
let entries = {}
// for manifest
let seed = {}
try {
  readdirSync(templates).forEach(template => {
    const basename = path.basename(template, path.extname(template))
    if (!basename.endsWith('.test')) {
      entries[basename] = path.join(templates, basename)
    }
  })
} catch (e) {
  // folder not exist
}

const jsRule = {
  test: /\.js$/,
  include: path.resolve(__dirname, 'src'),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-object-rest-spread', 'lodash']
      }
    },
    {
      loader: 'jsxstyle-loader',
      options: {
        whitelistedModules: [require.resolve('./src/constants')]
      }
    }
  ]
}
let config = {
  entry: entries,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      jsRule,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new JsxstyleLoaderPlugin(),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ManifestPlugin({ seed }),
    new CssoWebpackPlugin()
  ],
  externals: [nodeExternals()],
  target: 'node'
}
// bundle client/index.js too when it exists
// TODO what if we wanna separate those client js template by template
// it should target web
if (fs.existsSync(path.resolve(__dirname, 'src/client/index.js'))) {
  config = [
    config,
    {
      mode: 'production',
      entry: {
        client: './src/client'
      },
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        libraryTarget: 'umd',
        library: '[name]'
      },
      module: {
        rules: [jsRule]
      },
      plugins: [
        new ManifestPlugin({ seed }),
        new JsxstyleLoaderPlugin(),
        new LodashModuleReplacementPlugin()
      ]
    }
  ]
}
module.exports = config
