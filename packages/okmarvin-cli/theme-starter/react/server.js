const okmarvin = require('@okmarvin/okmarvin')
const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const Bundler = require('parcel-bundler')
const bundler = new Bundler(path.join(__dirname, 'index.html'), {
  outDir: 'public'
})
const root = path.join(__dirname, '..', '..')
bundler.on('buildEnd', () => {
  if (!watcher) {
    watcher = chokidar.watch(
      [
        path.join(root, 'content'),
        path.join(root, '_config.toml'),
        path.join(root, '.okmarvin.js')
      ],
      {
        useFsEvents:
          process.platform === 'darwin' && process.env.NODE_ENV !== 'test',
        ignored: /(^|[/\\])\../,
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
    path.join(__dirname, '_data.json'),
    JSON.stringify(conn),
    err => {
      if (err) {
        return callback(err)
      }
      if (!bundler.server) {
        bundler.serve()
      }
      callback(null, conn)
    }
  )
}
okmarvin({ devHook, root })
