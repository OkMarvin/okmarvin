const fs = require('fs-extra')
const path = require('path')
const requireResolve = require('../../helpers/requireResolve')
module.exports = function (conn, callback) {
  const { root, dest, site } = conn
  const { theme } = site
  const themeRoot = path.join(
    requireResolve(theme, { paths: [process.cwd()] }),
    '..'
  )
  fs.copy(
    path.join(themeRoot, 'static'),
    path.join(root, dest, 'static'),
    err => {
      // maybe static doesn't exist?
      if (err) return callback(null, conn)
      return callback(null, conn)
    }
  )
}
