// read theme manifest json file
// then merge with siteConfig object
const fse = require('fs-extra')
const requireResolve = require('../helpers/requireResolve')
const ajv = require('../helpers/ajv')
const themeSchema = require('../schemas/theme')
module.exports = function (root, theme) {
  return new Promise((resolve, reject) => {
    const themeRoot = requireResolve(theme, { paths: [root] })
    fse.readFile(themeRoot, 'utf8', (err, manifestStr) => {
      if (err) return reject(err)
      const theme = JSON.parse(manifestStr)
      if (!ajv.validate(themeSchema, theme)) {
        return console.log(`Something wrong with ${themeRoot}`, ajv.errors)
      }
      resolve(theme)
    })
  })
}
