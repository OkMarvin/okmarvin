const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const readData = require('@okmarvin/okmarvin/lib/readData')
const parseData = require('@okmarvin/okmarvin/lib/parseData')
const composeList = require('@okmarvin/okmarvin/lib/composeList')
const guard = require('@okmarvin/okmarvin/lib/guard')
const async = require('neo-async')
const webpackConfigPromise = new Promise((resolve, reject) => {
  async.waterfall(
    [
      callback => callback(null, __dirname),
      readData,
      parseData,
      composeList,
      guard
    ],
    (err, results) => {
      if (err) return reject(err)
      fs.outputJSON(path.join(__dirname, '_data.json'), results, err => {
        if (err) return reject(err)
        const entry = {
          main: './src/index'
        }
        if (fs.pathExistsSync(path.join('./src/client/index.js'))) {
          entry['client'] = './src/client'
        }
        resolve({
          entry,
          mode: 'development',
          output: {
            publicPath: '/'
          },
          devServer: {
            historyApiFallback: true
          },
          resolve: {
            symlinks: true
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                  {
                    loader: 'babel-loader'
                  }
                ]
              },
              {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
              }
            ]
          },
          plugins: [
            new HtmlWebpackPlugin({
              inject: false,
              template: require('html-webpack-template'),
              appMountId: '___OkMarvin___',
              title: 'January for OkMarvin'
            })
          ]
        })
      })
    }
  )
})
module.exports = webpackConfigPromise
