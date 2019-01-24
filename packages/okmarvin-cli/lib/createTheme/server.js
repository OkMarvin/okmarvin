module.exports = function (root) {
  return `
const express = require('express')
const okmarvin = require('@okmarvin/okmarvin')
const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const Bundler = require('parcel-bundler')
const history = require('connect-history-api-fallback')
const getPort = require('get-port')
const root = '${root}'

const bundler = new Bundler(path.join(__dirname, 'index.html'))
let server
const app = express()
const historyOptions = {
  verbose: true,
  rewrites: [
    {
      from: /\\/static/i,
      to: function (context) {
        return '/public' + context.parsedUrl.pathname
      }
    },
    {
      from: /\\.(jpg|jpeg|png|gif|webp|html)$/i,
      to: function (context) {
        const pathname = context.parsedUrl.pathname
        const { files } = app.locals.conn
        const findParent = files.find(
          file => file.permalink === '/' + pathname.split(path.sep)[1] + '/'
        )
        const myRoot = path.dirname(findParent.filePath)
        const relativePath = path.relative(findParent.permalink, pathname)
        return path.join('/', myRoot, relativePath)
      }
    }
  ]
}
app.use(history(historyOptions))
app.use(express.static(path.join(__dirname, root)))
app.use(bundler.middleware())

bundler.on('buildEnd', () => {
  if (!watcher) {
    watcher = chokidar.watch(
      [
        path.resolve(root, '_posts'),
        path.resolve(root, '_pages'),
        path.resolve(root, '_config.toml'),
        path.resolve(root, '.okmarvin.js')
      ],
      {
        useFsEvents:
          process.platform === 'darwin' && process.env.NODE_ENV !== 'test',
        ignored: /(^|[/\\\\])\\../,
        ignoreInitial: true
      }
    )
    watcher.on('all', () => {
      okmarvin({ devHook, root })
    })
  }
})
let watcher
const devHook = function (conn, callback) {
  fs.writeFile(
    path.join(__dirname, '_data.js'),
    'export default' + JSON.stringify(conn),
    err => {
      if (err) {
        return callback(err)
      }
      app.locals.conn = conn
      if (!server) {
        getPort({ port: 3000 }).then(port => {
          server = app.listen(port, '0.0.0.0').on('listening', () => {
            console.log('Server listening on http://0.0.0.0:' + port)
          })
        })
      }
      callback(null, conn)
    }
  )
}
okmarvin({ devHook, root }) // write conn data to _data.js
`
}
