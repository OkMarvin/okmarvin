const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const {
    cache: { layoutHash: lastLayoutHash },
    layoutHash,
    clean
  } = conn
  if (clean) return callback(null, true)
  if (
    lastLayoutHash.length === layoutHash.length &&
    lastLayoutHash.every(function (element, index) {
      return element === layoutHash[index]
    })
  ) {
    // nothing changed
    logger.verbose('Layouts kept the same')
    callback(null, false)
  } else {
    // some layouts changed, regenerate all
    logger.verbose('Layouts changed')
    callback(null, true)
  }
}
