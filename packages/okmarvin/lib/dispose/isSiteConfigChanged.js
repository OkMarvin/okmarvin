const logger = require('@parcel/logger')
const isEqual = require('lodash/fp/isEqual')
module.exports = function (conn, callback) {
  const {
    cache: { site: lastSite },
    site,
    clean
  } = conn
  if (clean) return callback(null, true)
  if (!isEqual(site, lastSite)) {
    logger.verbose(`site changed`)
    callback(null, true)
  } else {
    logger.verbose(`site kept the same`)
    callback(null, false)
  }
}
