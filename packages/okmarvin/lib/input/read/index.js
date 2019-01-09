'use strict'

const path = require('path')
const fs = require('fs-extra')
const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')

const { prettyTime } = require('@okmarvin/helpers')

const prepare = require('./prepare')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = performance.now()

  const { root, source } = conn
  const sourcePath = path.join(root, source)
  if (!fs.existsSync(sourcePath)) {
    // user should fix it
    return logger.warn(
      `Oops, nothing to do because "${source}" directory does not exist.`
    )
  }

  prepare(conn, (err, conn) => {
    if (err) return callback(err)

    logger.success(`Read in ${prettyTime(performance.now() - begin)}`)
    callback(null, conn)
  })
}
