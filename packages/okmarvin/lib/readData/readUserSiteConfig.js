const fs = require('fs')
module.exports = (file, callback) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return callback(null, '')
    callback(null, data)
  })
}
