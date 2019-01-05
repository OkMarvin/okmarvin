// read theme manifest json file
// then merge with siteConfig object
const fs = require('fs')
const ajv = require('../../../helpers/ajv')
const themeSchema = require('../../../schemas/theme')
module.exports = function (root, theme) {
  return new Promise((resolve, reject) => {
    try {
      const themeRoot = require.resolve(theme, { paths: [root] })
      fs.readFile(themeRoot, 'utf8', (err, manifestStr) => {
        if (err) return resolve({})
        const theme = JSON.parse(manifestStr)
        if (!ajv.validate(themeSchema, theme)) {
          return reject(ajv.errors)
        }
        resolve(theme)
      })
    } catch (err) {
      // theme might not exist
      resolve({})
    }
  })
}
