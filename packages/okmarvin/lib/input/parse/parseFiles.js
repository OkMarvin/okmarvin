const async = require('neo-async')
const parseFile = require('./parseFile')
module.exports = function (conn, callback) {
  const { files } = conn
  async.map(
    files,
    (file, callback) => {
      const [filePath, { data, ...others }] = file
      parseFile(conn, { filePath, ...data, ...others }, callback)
    },
    (err, files) => {
      if (err) return callback(err)
      callback(null, { ...conn, files })
    }
  )
}
