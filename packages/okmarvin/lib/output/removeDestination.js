const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  fs.remove(path.join(conn.root, conn.to), err => {
    if (err) return callback(err)
    logger.verbose(`Cleaned '${conn.to}' directory`)
    callback(null, conn)
  })
}
