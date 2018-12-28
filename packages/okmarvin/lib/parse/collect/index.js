const async = require('async')
const collector = require('./collector')
module.exports = function (conn, callback) {
  const { files } = conn
  async.parallel(
    {
      tags: callback => collector(files, 'tags', callback)
    },
    (err, results) => {
      if (err) return callback(err)
      const { tags } = results
      callback(null, { ...conn, tags })
    }
  )
}
