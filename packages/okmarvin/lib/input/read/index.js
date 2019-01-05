const path = require('path')
const fs = require('fs-extra')
const logger = require('@parcel/logger')
const prettyTime = require('../../helpers/prettyTime')

const prepare = require('./prepare')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = Date.now()

  const { root, from } = conn
  const fromPath = path.join(root, from)
  if (!fs.existsSync(fromPath)) {
    // user should fix it
    return logger.warn(
      `Oops, nothing to do because "${from}" directory does not exist.`
    )
  }

  prepare(conn, (err, conn) => {
    if (err) return callback(err)
    logger.success(`Read in ${prettyTime(Date.now() - begin)}`)
    callback(null, conn)
  })
}
