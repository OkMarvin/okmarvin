const fs = require('fs-extra')
const path = require('path')
module.exports = ({ root }, callback) => {
  // cache for better build performance when `clean` option set to false
  // will be removed if not work
  try {
    const data = fs.readJsonSync(path.join(root, '_cache.json'))
    callback(null, data)
  } catch (err) {
    return callback(null, { lastThemeManifest: {}, files: [], layoutHash: [] })
  }
}
