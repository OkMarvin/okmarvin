// read theme manifest json file
// then merge with siteConfig object
const fse = require('fs-extra')
const requireResolve = require('../helpers/requireResolve')
module.exports = function (
  siteConfig = { theme: '@okmarvin/january' },
  callback
) {
  fse.readFile(
    requireResolve(siteConfig.theme),
    'utf8',
    (err, manifestStr) => {
      if (err) return callback(err)
      callback(null, { ...siteConfig, themeManifest: JSON.parse(manifestStr) })
    }
  )
}
