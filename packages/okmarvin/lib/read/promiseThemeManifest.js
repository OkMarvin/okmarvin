// read theme manifest json file
// then merge with siteConfig object
const fse = require('fs-extra')
const requireResolve = require('../helpers/requireResolve')
module.exports = function (root, theme) {
  return new Promise((resolve, reject) => {
    const themeRoot = requireResolve(theme, { paths: [root] })
    fse.readFile(themeRoot, 'utf8', (err, manifestStr) => {
      if (err) return reject(err)
      resolve(JSON.parse(manifestStr))
    })
  })
}
