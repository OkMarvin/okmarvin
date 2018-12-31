const async = require('neo-async')
const diffLayout = require('./diffLayout')
const computeFilesLayout = require('./computeFilesLayout')
/**
 * Compute layout for all files
 */
module.exports = function (conn, callback) {
  async.parallel(
    {
      files: callback => computeFilesLayout(conn, callback),
      clean: callback => diffLayout(conn, callback)
    },
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...conn, ...results })
    }
  )
}
