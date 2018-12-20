const copyFileAssets = require('./copyFileAssets')
const copyThemeStatic = require('./copyThemeStatic')
const copyPublic = require('./copyPublic')
const async = require('neo-async')
module.exports = function (conn, data, callback) {
  async.waterfall([
    callback => copyFileAssets(conn, data, callback),
    copyThemeStatic,
    copyPublic
  ], (err, results) => {
    if (err) return callback(err)
    return callback(null, conn, data)
  })
}
