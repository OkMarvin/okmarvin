const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  fs.emptyDir(path.join(conn.root, conn.dest), err => {
    if (err) return callback(err)
    logger.verbose(`Cleaned '${conn.dest}' directory`)
    callback(null)
  })
}
