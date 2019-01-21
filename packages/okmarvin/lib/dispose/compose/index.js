const async = require('neo-async')
const composePaginatedIndexs = require('./composePaginatedIndexs')
const composePaginatedTags = require('./composePaginatedTags')
const composePaginatedCategories = require('./composePaginatedCategories')
const composePaginatedAuthors = require('./composePaginatedAuthors')
const compose404 = require('./compose404')
module.exports = (conn, callback) => {
  const { files, themeManifest } = conn
  let composes = []
  if (themeManifest['index.js']) {
    composes = [...composes, callback => composePaginatedIndexs(conn, callback)]
  }
  if (themeManifest['category.js']) {
    composes = [
      ...composes,
      callback => composePaginatedCategories(conn, callback)
    ]
  }
  if (themeManifest['tag.js']) {
    composes = [...composes, callback => composePaginatedTags(conn, callback)]
  }
  if (themeManifest['author.js']) {
    composes = [
      ...composes,
      callback => composePaginatedAuthors(conn, callback)
    ]
  }
  if (themeManifest['404.js']) {
    composes = [...composes, callback => compose404(conn, callback)]
  }
  async.parallel(composes, (err, results) => {
    if (err) return callback(err)
    callback(null, {
      ...conn,
      files: files.concat(
        results.reduce((acc, result) => acc.concat(result), [])
      )
    })
  })
}
