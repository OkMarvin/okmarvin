const copyFileAssets = require('./copyFileAssets')
const copyThemeStatic = require('./copyThemeStatic')
const copyStatic = require('./copyStatic')
const async = require('neo-async')
module.exports = function (data, callback) {
  async.waterfall([
    callback => copyFileAssets(data, callback),
    copyThemeStatic,
    copyStatic
  ], (err, results) => {
    if (err) return callback(err)
    return callback(null, data)
  })
}
