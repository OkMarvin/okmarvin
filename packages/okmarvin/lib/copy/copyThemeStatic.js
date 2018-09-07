const fs = require('fs-extra')
const path = require('path')
const requireResolve = require('../helpers/requireResolve')
const config = require('@okmarvin/okmarvin/lib/configStore')
module.exports = function (data, callback) {
  const { siteConfig } = data
  const { cwd, destination } = config.get()
  const { theme } = siteConfig
  const themeRoot = path.join(
    requireResolve(theme, { paths: [process.cwd()] }),
    '..'
  )
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
