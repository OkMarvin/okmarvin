const fs = require('fs-extra')
const path = require('path')
const requireResolve = require('../helpers/requireResolve')
module.exports = function (data, callback) {
  const { siteConfig, cwd, destination } = data
  const { theme } = siteConfig
  const themeRoot = path.join(requireResolve(theme), '..')
  fs.copy(
    path.join(themeRoot, 'static'),
    path.join(cwd, destination, 'static'),
    err => {
      // maybe static doesn't exist?
      if (err) return callback(null, data)
      return callback(null, data)
    }
  )
}
