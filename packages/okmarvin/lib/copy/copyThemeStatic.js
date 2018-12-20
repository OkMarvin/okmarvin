const fs = require('fs-extra')
const path = require('path')
const requireResolve = require('../helpers/requireResolve')
module.exports = function (conn, data, callback) {
  const { siteConfig } = data
  const { root, to } = conn
  const { theme } = siteConfig
  const themeRoot = path.join(
    requireResolve(theme, { paths: [process.cwd()] }),
    '..'
  )
  fs.copy(
    path.join(themeRoot, 'static'),
    path.join(root, to, 'static'),
    err => {
      // maybe static doesn't exist?
      if (err) return callback(null, data)
      return callback(null, conn, data)
    }
  )
}
