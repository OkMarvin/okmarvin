const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const {
    cache: { layoutHash: lastLayoutHash },
    layoutHash
  } = conn
  let layoutHashSorted = layoutHash.sort()
  if (
    lastLayoutHash.length === layoutHash.length &&
    lastLayoutHash.every(function (element, index) {
      return element === layoutHashSorted[index]
    })
  ) {
    // nothing changed
    logger.verbose('layouts kept the same')
  } else {
    // some layouts changed, regenerate all
    logger.verbose('layouts changed')
    conn = { ...conn, clean: true }
  }
  callback(null, conn)
}
