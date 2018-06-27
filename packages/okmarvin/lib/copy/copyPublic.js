const fs = require('fs-extra')
const path = require('path')
// copy public
module.exports = function (data, callback) {
  const { cwd, destination } = data
  fs.copy(
    path.join(cwd, 'public'),
    path.join(cwd, destination),
    err => {
      // maybe public doesn't exist?
      if (err) return callback(null, data)
      return callback(null, data)
    }
  )
}
