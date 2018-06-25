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
const debounce = require('lodash/debounce')
/**
 *  Generate _data.json
 * @param {function|null} callback
 */
function loadData (initial = false) {
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
      const data = {
        ...results,
        files: results.files.filter(r => path.extname(r.permalink) === '')
      }
      fs.outputJson(path.join(__dirname, '_data.json'), data, err => {
        if (err) return console.error(err)
        initial && startServer(data)
      })
    }
  )
}
function startServer (INITIAL_DATA) {
  serve(
    {},
    {
      content: [__dirname],
      config: config,
      hotClient: {
        host: 'localhost',
        port: 8090
      },
      add: (app, middleware, options) => {
        // we need to rewrite all static path to content folder
        // FIXME INITIAL_DATA is always changing
        const { files } = INITIAL_DATA
        const historyOptions = {
          verbose: true,
          rewrites: [
            {
              from: /\/static/i,
              to: function (context) {
                return context.parsedUrl.pathname
              }
            },
            {
              from: /\.(jpg|jpeg|png|gif|webp)$/i,
              to: function (context) {
                const pathname = context.parsedUrl.pathname
                const findParent = files.find(
                  file =>
                    file.permalink ===
                    pathname.replace(path.basename(pathname), '')
                )
                return `/content${path.dirname(
                  findParent.filePath.split('content')[1]
                )}/${path.basename(context.parsedUrl.pathname)}`
              }
            }
          ]
        }
        app.use(convert(history(historyOptions)))
      }
    }
  ).then(({app, on, options}) => {
    const watcher = chokidar.watch(['./content', './_config.yml'], {
      ignored: /(^|[/\\])\../,
      ignoreInitial: true
    })
    function loadDataWrapper () {
      loadData()
    }
    watcher.on('all', debounce(loadDataWrapper, 200))
    app.on('close', () => {
      watcher.close()
    })
  })
}
loadData(true)
