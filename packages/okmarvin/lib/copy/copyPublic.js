const fs = require('fs-extra')
const path = require('path')
const configStore = require('@okmarvin/okmarvin/lib/configStore')
// copy public
module.exports = function (data, callback) {
  const { cwd, destination } = configStore.get()
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
