const async = require('neo-async')
const computeFilesLayout = require('./computeFilesLayout')
/**
 * Compute layout for all files
 */
module.exports = function (conn, callback) {
  async.waterfall(
    [callback => computeFilesLayout(conn, callback)],
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...results })
    }
  )
}
