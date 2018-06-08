const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const { siteConfig, cwd } = data
  const { themeManifest, theme } = siteConfig
  const clientKey = 'client.js'
  const themeRoot = path.join(require.resolve(theme), '..')
  if (themeManifest[clientKey]) {
    fs.copy(
      path.join(themeRoot, themeManifest[clientKey]),
      path.join(cwd, 'dist', 'static', themeManifest[clientKey]),
      err => {
        if (err) return callback(err)
        return callback(null, data)
      }
    )
  }
}
