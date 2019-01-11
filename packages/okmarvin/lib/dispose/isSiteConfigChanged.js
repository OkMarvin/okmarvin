const logger = require('@parcel/logger')
const isEqual = require('lodash/fp/isEqual')
module.exports = function (conn, callback) {
  const {
    cache: { siteConfig: lastSiteConfig },
    siteConfig,
    clean
  } = conn
  if (clean) return callback(null, true)
  if (!isEqual(siteConfig, lastSiteConfig)) {
    logger.verbose(`siteConfig changed`)
    callback(null, true)
  } else {
    logger.verbose(`siteConfig kept the same`)
    callback(null, false)
  }
}
