const async = require('neo-async')
const composeIndexList = require('./composeIndexList')
const composeTagList = require('./composeTagList')
const composeFeed = require('./composeFeed')
const composeSitemap = require('./composeSitemap')
const compose404 = require('./compose404')
module.exports = function (conn, callback) {
  const { siteConfig, files } = conn
  async.parallel(
    [
      callback => compose404(conn, callback),
      callback => composeIndexList(conn, conn, callback),
      callback => composeTagList(conn, conn, callback),
      callback => composeFeed(conn, callback),
      callback => composeSitemap(conn, callback)
    ],
    function (err, results) {
      if (err) return callback(err)
      callback(null, {
        ...conn,
        siteConfig,
        files: files.concat(
          results.reduce((acc, result) => acc.concat(result), [])
        )
      })
    }
  )
}
