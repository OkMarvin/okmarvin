const async = require('neo-async')
const composeIndexList = require('./composeIndexList')
const composeTagList = require('./composeTagList')
const composeFeed = require('./composeFeed')
const composeSitemap = require('./composeSitemap')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  async.parallel(
    [
      callback => composeIndexList(data, callback),
      callback => composeTagList(data, callback),
      callback => composeFeed(data, callback),
      callback => composeSitemap(data, callback)
    ],
    function (err, results) {
      if (err) return callback(err)
      callback(null, {
        ...data,
        siteConfig,
        files: files.concat(
          results.reduce((acc, result) => acc.concat(result), [])
        )
      })
    }
  )
}
