const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const {
    cache: { layoutHash: lastLayoutHash },
    siteConfig: { layoutHash },
    clean
  } = conn
  if (
    lastLayoutHash.length === layoutHash.length &&
    lastLayoutHash.every(function (element, index) {
      return element === layoutHash[index]
    })
  ) {
    // nothing changed
    logger.verbose('layouts kept the same')
    callback(null, clean)
  } else {
    // some layouts changed, regenerate all
    logger.verbose('layouts changed')
    callback(null, true)
  }
}
