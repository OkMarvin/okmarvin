const fs = require('fs-extra')
const path = require('path')
// copy public
module.exports = function (conn, callback) {
  const { root, dest } = conn
  fs.copy(
    path.join(root, 'public'),
    path.join(root, dest),
    err => {
      // maybe public doesn't exist?
      if (err) return callback(null, conn)
      return callback(null, conn)
    }
  )
}
