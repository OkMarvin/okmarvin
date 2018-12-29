const fs = require('fs-extra')
const path = require('path')
module.exports = (root, callback) => {
  // cache for better build performance when `clean` option set to false
  // will be removed if not work
  fs.readJson(path.join(root, '_cache.json'), (err, data) => {
    if (err) return callback(null, { lastThemeManifest: {} }) // return a default one
    return callback(null, data)
  })
}
