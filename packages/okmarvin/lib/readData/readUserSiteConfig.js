const fse = require('fs-extra')
const TOML = require('@iarna/toml')
module.exports = (file, callback) => {
  // read from toml file
  fse.readFile(file, 'utf8', (err, data) => {
    if (err) return callback(null, {})
    try {
      callback(null, TOML.parse(data))
    } catch (e) {
      throw e
    }
  })
}
