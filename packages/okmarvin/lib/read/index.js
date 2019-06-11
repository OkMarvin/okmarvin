'use strict'

const logger = require('@parcel/logger')
const async = require('neo-async')
const promiseCatcher = require('@okmarvin/promise-catcher')
const { prettyTime } = require('@okmarvin/helpers')

const readSite = require('./readSite')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const promiseThemeManifest = require('./promiseThemeManifest')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function(conn, callback) {
  const begin = Date.now()

  async.waterfall(
    [
      callback =>
        async.parallel(
          {
            okmarvinConfig: callback => readOkmarvinConfig(conn, callback),
            site: callback => readSite(conn, callback),
            files: callback => readFiles(conn, callback)
          },
          callback
        ),
      async ({ okmarvinConfig, site, files }, callback) => {
        let [err, themeManifest] = await promiseCatcher(
          promiseThemeManifest(conn.root, site.theme)
        )
        if (err) {
          return callback(err)
        }

        const { 'client.js': clientJs, ...others } = themeManifest
        callback(null, {
          okmarvinConfig,
          site,
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
