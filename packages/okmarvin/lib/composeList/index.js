const async = require('neo-async')
const composeIndexList = require('./composeIndexList')
const composeTagList = require('./composeTagList')
const composeFeed = require('./composeFeed')
const composeSitemap = require('./composeSitemap')
const compose404 = require('./compose404')
module.exports = function (conn, data, callback) {
  const { siteConfig, files } = data
  async.parallel(
    [
      callback => compose404(data, callback),
      callback => composeIndexList(conn, data, callback),
      callback => composeTagList(conn, data, callback),
      callback => composeFeed(data, callback),
      callback => composeSitemap(data, callback)
    ],
    function (err, results) {
      if (err) return callback(err)
      callback(null, conn, {
        ...data,
        siteConfig,
        files: files.concat(
          results.reduce((acc, result) => acc.concat(result), [])
        )
      })
    }
  )
}
