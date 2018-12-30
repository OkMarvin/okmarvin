const async = require('neo-async')
const composePaginatedIndexs = require('./composePaginatedIndexs')
const composePaginatedTags = require('./composePaginatedTags')
const composePaginatedCategories = require('./composePaginatedCategories')
const composeFeed = require('./composeFeed')
const composeSitemap = require('./composeSitemap')
const compose404 = require('./compose404')
module.exports = function (conn, callback) {
  const {
    files,
    siteConfig: { themeManifest }
  } = conn
  let composes = [
    callback => composeFeed(conn, callback),
    callback => composeSitemap(conn, callback)
  ]
  if (themeManifest['index.js']) {
    composes = composes.concat([callback => composePaginatedIndexs(conn, callback)])
  }
  if (themeManifest['category.js']) {
    composes = composes.concat([callback => composePaginatedCategories(conn, callback)])
  }
  if (themeManifest['tag.js']) {
    composes = composes.concat([callback => composePaginatedTags(conn, callback)])
  }
  if (themeManifest['404.js']) {
    composes = composes.concat([callback => compose404(conn, callback)])
  }
  async.parallel(composes, function (err, results) {
    if (err) return callback(err)
    callback(null, {
      ...conn,
      files: files.concat(
        results.reduce((acc, result) => acc.concat(result), [])
      )
    })
  })
}
