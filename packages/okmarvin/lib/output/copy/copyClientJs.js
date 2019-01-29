const fs = require('fs-extra')
const { join } = require('path')
const requireResolve = require('../../helpers/requireResolve')
module.exports = function (conn, callback) {
  const { root, dest, site, clientJsManifest } = conn
  const { theme } = site
  const themeRoot = join(
    requireResolve(theme, { paths: [process.cwd()] }),
    '..'
  )
  if (clientJsManifest['client.js']) {
    // client.js exist, copy to /static/js/
    fs.copy(
      join(themeRoot, clientJsManifest['client.js']),
      join(root, dest, 'static', 'js', clientJsManifest['client.js']),
      err => {
        if (err) return callback(null, conn)
        return callback(null, conn)
      }
    )
  }
}
