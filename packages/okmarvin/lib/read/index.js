const path = require('path')
const fs = require('fs-extra')
const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')

const readOkmarvinConfig = require('./readOkmarvinConfig')
const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readCache = require('./readCache')
const readLayouts = require('./readLayouts')

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
  async.waterfall(
    [
      callback =>
        async.parallel(
          {
            cache: callback => readCache(conn, callback),
            okmarvinConfig: callback => readOkmarvinConfig(conn, callback),
            siteConfig: callback => readSiteConfig(conn, callback),
            files: callback => readFiles(conn, callback)
          },
          (err, results) => {
            if (err) return callback(err)
            callback(null, { ...conn, ...results })
          }
        ),
      readLayouts
    ],
    (err, conn) => {
      if (err) return callback(err)
      logger.success(`Read in ${prettyTime(Date.now() - begin)}`)
      callback(null, conn)
    }
  )
}
