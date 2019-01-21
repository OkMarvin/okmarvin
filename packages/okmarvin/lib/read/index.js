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
            filesWithAssets: callback => readFiles(conn, callback)
          },
          callback
        ),
      async (
        {
          cache,
          okmarvinConfig,
          siteConfig,
          filesWithAssets: { files, fileAssets }
        },
        callback
      ) => {
        const [err, themeManifest] = await promiseCatcher(
          promiseThemeManifest(conn.root, siteConfig.theme)
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
          fileAssets,
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
