const chokidar = require('chokidar')
const serve = require('webpack-serve')
const config = require('./webpack.config.js')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const async = require('neo-async')
const fs = require('fs-extra')
const readData = require('@okmarvin/okmarvin/lib/readData')
const parseData = require('@okmarvin/okmarvin/lib/parseData')
const composeList = require('@okmarvin/okmarvin/lib/composeList')
const guard = require('@okmarvin/okmarvin/lib/guard')
const path = require('path')
/**
 *  Generate _data.json
 * @param {function|null} callback
 */
function loadData (callback) {
  async.waterfall(
    [
      callback => callback(null, __dirname, 'content', 'dist'),
      readData,
      parseData,
      composeList,
      guard
    ],
    (err, results) => {
      if (err) return console.error(err)
      fs.outputJSON(path.join(__dirname, '_data.json'), results, err => {
        if (err) return console.error(err)
        callback && callback(null)
      })
    }
  )
}
loadData(() => {
  serve({
    config,
    hot: {
      host: 'localhost',
      port: 8090
    },
    add: (app, middleware, options) => {
      const historyOptions = {}
      app.use(convert(history(historyOptions)))
    }
  }).then(server => {
    server.on('listening', ({ server, options }) => {
      console.log('i am running')
    })
    const watcher = chokidar.watch(['./content', './_config.yml'], {
      ignored: /(^|[/\\])\../,
      ignoreInitial: true
    })
    watcher.on('all', (e, path) => {
      loadData()
    })
  })
})
