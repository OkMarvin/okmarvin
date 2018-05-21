const fs = require('fs')
module.exports = function (siteConfig, callback) {
  fs.readFile(require.resolve(siteConfig.theme), 'utf8', (err, manifestStr) => {
    if (err) return callback(err)
    callback(null, { ...siteConfig, themeManifest: JSON.parse(manifestStr) })
  })
}
