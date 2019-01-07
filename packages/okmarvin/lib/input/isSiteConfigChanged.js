const logger = require('@parcel/logger')
const isEqual = require('lodash/isEqual')
module.exports = function (conn, callback) {
  const {
    cache: { siteConfig: lastSiteConfig },
    siteConfig,
    clean
  } = conn
  if (clean) return callback(null, conn)
  if (!isEqual(siteConfig, lastSiteConfig)) {
    logger.verbose(`siteConfig changed`)
    callback(null, { ...conn, clean: true })
  } else {
    logger.verbose(`siteConfig kept the same`)
    callback(null, conn)
  }
}
