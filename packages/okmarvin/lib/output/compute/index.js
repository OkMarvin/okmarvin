const async = require('neo-async')

const computeFileLayout = require('./computeFileLayout')
/**
 * Compute layout for all files
 */
module.exports = function(conn, callback) {
  async.waterfall(
    [
      callback => {
        try {
          callback(null, computeFileLayout(conn))
        } catch (err) {
          callback(err)
        }
      }
    ],
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...results })
    }
  )
}
