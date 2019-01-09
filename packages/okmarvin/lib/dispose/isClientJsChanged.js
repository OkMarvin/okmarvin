const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const {
    cache: { clientJsManifest: lastClientJsManifest },
    clientJsManifest,
    clean
  } = conn
  if (clean) return callback(null, true)
  if (lastClientJsManifest['client.js'] !== clientJsManifest['client.js']) {
    logger.verbose(`Client side script file changed`)
    callback(null, true)
  } else {
    logger.verbose(`Client side script file kept the same`)
    callback(null, false)
  }
}
