const async = require('neo-async')
const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const readCache = require('./readCache')
module.exports = (conn, callback) =>
  async.parallel(
    {
      cache: callback => readCache(conn, callback),
      okmarvinConfig: callback => readOkmarvinConfig(conn, callback),
      siteConfig: callback => readSiteConfig(conn, callback),
      files: callback => readFiles(conn, callback)
    },
    (err, { cache, okmarvinConfig, siteConfig, files }) => {
      if (err) return callback(err)
      callback(null, {
        ...conn,
        cache,
        okmarvinConfig,
        siteConfig,
        files
      })
    }
  )
