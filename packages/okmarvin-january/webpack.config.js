const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const entry = {
  main: './src/index'
}
if (fs.pathExistsSync(path.join('./src/client/index.js'))) {
  entry['client'] = './src/client'
}
module.exports = {
  entry,
  mode: 'development',
  output: {
    publicPath: '/'
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
      appMountId: 'app',
      title: 'January for OkMarvin'
    })
  ]
}
