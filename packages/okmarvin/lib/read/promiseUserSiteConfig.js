const fse = require('fs-extra')
const TOML = require('@iarna/toml')
module.exports = file => {
  return new Promise((resolve, reject) => {
    // read from toml file
    fse.readFile(file, 'utf8', (err, data) => {
      if (err) return reject(err)
      try {
        resolve(TOML.parse(data))
      } catch (err) {
        // need user fix
        reject(err)
      }
    })
  })
}
