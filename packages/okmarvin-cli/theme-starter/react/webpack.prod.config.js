/**
 * for React.js
 * you can customize it as you need
 */
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssoWebpackPlugin = require('csso-webpack-plugin').default
const ManifestPlugin = require('webpack-manifest-plugin')

const fs = require('fs')
const { readdirSync } = fs
const templates = path.resolve(__dirname, 'src', 'templates')
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
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties'
        ]
      }
    }
  ]
}
let config = {
  entry: entries,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    libraryTarget: 'commonjs'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
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
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')(), require('cssnano')()]
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/static/img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ManifestPlugin({ seed }),
    new CssoWebpackPlugin()
  ],
  externals: [nodeExternals()],
  target: 'node'
}
// bundle client/index.js too when it exists
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
        filename: '[name].[contenthash].js' // do not remove contenthash here!! Or cache will be broken.
      },
      module: {
        rules: [jsRule]
      },
      plugins: [new ManifestPlugin({ seed })]
    }
  ]
}
module.exports = config
