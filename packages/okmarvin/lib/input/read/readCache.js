const fs = require('fs-extra')
const path = require('path')
const defaultCache = {
  lastThemeManifest: {},
  files: [],
  layoutHash: [],
  lastClientJsManifest: {}
}
module.exports = ({ root }, callback) => {
  // cache for better build performance when `clean` option set to false
  // will be removed if not work
  try {
    const data = fs.readJsonSync(path.join(root, '_cache.json'))
    callback(null, {
      ...defaultCache,
      ...data
    })
  } catch (err) {
    return callback(null, defaultCache)
  }
}
