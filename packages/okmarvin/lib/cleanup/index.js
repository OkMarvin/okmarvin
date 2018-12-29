const fs = require('fs-extra')
const async = require('neo-async')
const path = require('path')
module.exports = function (conn, callback) {
  const diff = conn.cache.files.filter(
    x => !conn.files.map(file => file.permalink).includes(x)
  )
  async.each(
    diff,
    (file, callback) => {
      fs.remove(path.join(conn.to, file), err => {
        if (err) return callback(err)
        callback()
      })
    },
    () => {
      callback(null, conn)
    }
  )
}
