const copyFileAssets = require('./copyFileAssets')
const copyThemeStatic = require('./copyThemeStatic')
const copyPublic = require('./copyPublic')
const async = require('neo-async')
module.exports = function (conn, callback) {
  async.parallel([
    callback => copyFileAssets(conn, callback),
    callback => copyThemeStatic(conn, callback),
    callback => copyPublic(conn, callback)
  ], (err, results) => {
    if (err) return callback(err)
    return callback(null, conn)
  })
}
