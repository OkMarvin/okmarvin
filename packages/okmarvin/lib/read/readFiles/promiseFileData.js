const fs = require('fs')
const matter = require('gray-matter')
const { ajv } = require('@okmarvin/helpers')
const TOML = require('@iarna/toml')
const fileSchema = require('../../schemas/file')
const logger = require('@parcel/logger')
const async = require('neo-async')
const path = require('path')
module.exports = function (root, relativeFilePath) {
  const filePath = path.join(root, relativeFilePath)
  return new Promise((resolve, reject) => {
    async.parallel(
      {
        file: callback =>
          fs.readFile(filePath, 'utf8', (err, fileContent) => {
            if (err) return callback(err)
            const file = matter(fileContent, {
              excerpt: true,
              excerpt_separator: '<!-- end -->', // might allow user configuration?
              engines: {
                toml: TOML.parse.bind(TOML) // allow user to user TOML in front matter with ---toml
              }
            })
            if (!ajv.validate(fileSchema, file)) {
              return logger.warn(
                'Oops! Something is wrong, ',
                relativeFilePath,
                ajv.errors
              )
            }
            callback(null, file)
          }),
        stats: callback => {
          fs.stat(filePath, (err, stats) => {
            if (err) return callback(err)
            const { ctimeMs } = stats // may need other fields
            callback(null, { ctimeMs })
          })
        }
      },
      (err, results) => {
        if (err) return reject(err)
        const { file, stats } = results
        const { data, ...others } = file
        resolve({ filePath: relativeFilePath, ...data, ...others, stats })
      }
    )
  })
}
