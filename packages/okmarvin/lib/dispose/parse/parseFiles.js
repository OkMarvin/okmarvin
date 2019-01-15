const async = require('neo-async')
const parseFile = require('./parseFile')
module.exports = function (conn, callback) {
  const { files, ...others } = conn
  async.map(
    files,
    (file, callback) => {
      parseFile(conn, file, callback)
    },
    (err, files) => {
      if (err) return callback(err)
      callback(null, { ...others, files })
    }
  )
}
