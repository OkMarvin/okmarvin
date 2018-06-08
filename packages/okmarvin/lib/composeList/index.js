const async = require('neo-async')
const composeIndex = require('./composeIndex')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  // const lists = ['index', 'topic', 'author', 'date']
  // figure out which list pages do we want to render
  async.parallel([callback => composeIndex(data, callback)], function (
    err,
    results
  ) {
    if (err) return callback(err)
    callback(null, {
      ...data,
      siteConfig,
      files: files.concat(
        results.reduce((acc, result) => acc.concat(result), [])
      )
    })
  })
}
