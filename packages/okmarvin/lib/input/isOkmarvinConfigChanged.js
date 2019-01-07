const logger = require('@parcel/logger')
const isEqual = require('lodash/isEqual')
module.exports = function (conn, callback) {
  const {
    cache: { okmarvinConfig: lastOkmarvinConfig },
    okmarvinConfig,
    clean
  } = conn
  if (clean) return callback(null, conn)
  if (!isEqual(okmarvinConfig, lastOkmarvinConfig)) {
    logger.verbose(`okmarvinConfig changed`)
    callback(null, { ...conn, clean: true })
  } else {
    logger.verbose(`okmarvinConfig kept the same`)
    callback(null, conn)
  }
}
