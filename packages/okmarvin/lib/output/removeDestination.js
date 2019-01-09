const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
module.exports = async function (conn, callback) {
  try {
    await fs.emptyDir(path.join(conn.root, conn.dest))
    logger.verbose(`Cleaned '${conn.dest}' directory`)
    callback(null, conn)
  } catch (err) {
    callback(null, conn)
  }
}
