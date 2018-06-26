const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const { cwd, destination } = data
  fs.copy(
    path.join(cwd, 'static'),
    path.join(cwd, destination, 'static'),
    err => {
      // maybe static doesn't exist?
      if (err) return callback(null, data)
      return callback(null, data)
    }
  )
}
