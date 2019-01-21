const async = require('async')
const collector = require('./collector')
module.exports = function (conn, callback) {
  const { files } = conn
  async.parallel(
    {
      tags: callback => collector(files, 'tags', callback),
      categories: callback => collector(files, 'categories', callback),
      authors: callback => collector(files, 'author', callback)
    },
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...conn, ...results })
    }
  )
}
