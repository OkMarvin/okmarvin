const async = require('neo-async')
const composeIndex = require('./composeIndex')
const composeTag = require('./composeTag')
const composeFeed = require('./composeFeed')
const composeSitemap = require('./composeSitemap')
const compose404 = require('./compose404')
module.exports = function (conn, callback) {
  const { files } = conn
  async.parallel(
    [
      callback => compose404(conn, callback),
      callback => composeIndex(conn, callback),
      callback => composeTag(conn, callback),
      callback => composeFeed(conn, callback),
      callback => composeSitemap(conn, callback)
    ],
    function (err, results) {
      if (err) return callback(err)
      callback(null, {
        ...conn,
        files: files.concat(
          results.reduce((acc, result) => acc.concat(result), [])
        )
      })
    }
  )
}
