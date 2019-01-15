'use strict'

const logger = require('@parcel/logger')
const async = require('neo-async')
const promiseCatcher = require('@okmarvin/promise-catcher')
const { prettyTime } = require('@okmarvin/helpers')

const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const promiseThemeManifest = require('./promiseThemeManifest')
const readCache = require('./readCache')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = Date.now()

  async.waterfall(
    [
      callback =>
        async.parallel(
          {
            cache: callback => readCache(conn, callback),
            okmarvinConfig: callback => readOkmarvinConfig(conn, callback),
            siteConfig: callback => readSiteConfig(conn, callback),
            files: callback => readFiles(conn, callback)
          },
          callback
        ),
      async ({ cache, okmarvinConfig, siteConfig, files }, callback) => {
        const { root } = conn
        const { theme } = siteConfig
        const [err, themeManifest] = await promiseCatcher(
          promiseThemeManifest(root, theme)
        )
        if (err) {
          return callback(err)
        }

        const { 'client.js': clientJs, ...others } = themeManifest
        callback(null, {
          cache,
          okmarvinConfig,
          siteConfig,
          files,
          clientJsManifest: { 'client.js': clientJs },
          themeManifest: { ...others }
        })
      }
    ],
    (err, results) => {
      if (err) return callback(err)

      logger.success(`Read in ${prettyTime(Date.now() - begin)}`)
      callback(null, { ...conn, ...results })
    }
  )
}
