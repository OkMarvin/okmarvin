const fs = require('fs')
const TOML = require('@iarna/toml')
const logger = require('@parcel/logger')
module.exports = file => {
  return new Promise((resolve, reject) => {
    // read from toml file
    fs.readFile(file, 'utf8', (err, data) => {
      // if no file
      if (err) return logger.warn(`No _config.toml found, please create one`)
      try {
        resolve(TOML.parse(data))
      } catch (err) {
        // need user fix
        reject(err)
      }
    })
  })
}
