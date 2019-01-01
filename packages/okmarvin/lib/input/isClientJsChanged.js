const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const {
    cache: {
      lastClientJsManifest
    },
    siteConfig: {
      clientJsManifest
    }
  } = conn
  if (lastClientJsManifest['client.js'] !== clientJsManifest['client.js']) {
    logger.verbose(`Client side script file changed`)
    callback(null, { ...conn, clean: true })
  } else {
    logger.verbose(`Client side script file kept the same`)
    callback(null, conn)
  }
}
