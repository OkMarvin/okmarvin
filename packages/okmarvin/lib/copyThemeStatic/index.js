const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const { siteConfig, cwd, destination } = data
  const { themeManifest, theme } = siteConfig
  const clientKey = 'client.js'
  const themeRoot = path.join(require.resolve(theme), '..')
  if (themeManifest[clientKey]) {
    fs.copy(
      path.join(themeRoot, themeManifest[clientKey]),
      path.join(cwd, destination, 'static', themeManifest[clientKey]),
      err => {
        if (err) return callback(err)
        return callback(null, data)
      }
    )
  }
}
