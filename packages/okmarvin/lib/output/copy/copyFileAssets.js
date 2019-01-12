const { performance } = require('perf_hooks')
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const logger = require('@parcel/logger')
const { prettyTime } = require('@okmarvin/helpers')
const async = require('neo-async')

module.exports = function (conn, callback) {
  const begin = performance.now()
  const { root, dest, files, source } = conn
  // find all dirs where assets are allowed
  const dirObj = {}
  const dirs = files
    .filter(file => file.filePath)
    .map(file => [path.join(file.filePath, '..'), file.permalink])
    .filter(([dir, _]) => {
      if (dir === path.join(conn.root, source, 'post')) return false
      if (dir === path.join(conn.root, source, 'page')) return false
      return true
    })
    .map(([dir, permalink]) => {
      dirObj[dir] = permalink
      return dir
    })
  let assets = glob
    .sync('{post,page}/**/*', {
      cwd: path.join(root, source),
      absolute: true,
      nosort: true
    })
    .filter(asset => !asset.endsWith('.md'))
    .filter(
      asset => !['post', 'page'].includes(path.basename(path.join(asset, '..')))
    )
    .filter(asset => {
      return dirs.find(dir => {
        if (path.join(asset, '..') === dir) {
          return true
        }
        return false
      })
    })
  let container = []
  for (let i = 0, len = assets.length; i < len; i++) {
    const asset = assets[i]
    container.push([asset, dirObj[path.join(asset, '..')]])
  }
  async.parallel(
    container.map(([asset, target]) => callback => {
      fs.copy(
        asset,
        path.join(root, dest, target, path.basename(asset)),
        callback
      )
    }),
    (err, _results) => {
      if (err) return callback(err)
      logger.verbose(
        `File assets copied in ${prettyTime(performance.now() - begin)}`
      )
      return callback(null, conn)
    }
  )
}
