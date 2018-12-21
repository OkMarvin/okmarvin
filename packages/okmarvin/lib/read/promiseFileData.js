const fs = require('fs')
const matter = require('gray-matter')
const ajv = require('../helpers/ajv')
const TOML = require('@iarna/toml')
const fileSchema = require('../schemas/file')
module.exports = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) return reject(err)
      const file = matter(fileContent, {
        excerpt: true,
        excerpt_separator: '<!-- end -->', // might allow user configuration?
        engines: {
          toml: TOML.parse.bind(TOML) // allow user to user TOML in front matter with ---toml
        }
      })
      if (
        !ajv.validate(
          fileSchema,
          file
        )
      ) {
        return console.log(
          'Oops! Something is wrong, ',
          filePath,
          ajv.errors
        )
      }
      resolve([filePath, file]) // we return file with its filePath
    })
  })
}
