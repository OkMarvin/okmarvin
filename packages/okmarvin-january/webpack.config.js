const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const entry = {
  main: './src/index'
}
if (fs.pathExistsSync(path.join('./src/client.js'))) {
  entry['client'] = './src/client'
}
module.exports = {
  entry,
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-object-rest-spread']
            }
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
}
