'use strict'

const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')
const async = require('neo-async')
const promiseCatcher = require('@okmarvin/promise-catcher')
const { prettyTime } = require('@okmarvin/helpers')

const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const promiseThemeManifest = require('./promiseThemeManifest')
const readLayouts = require('./readLayouts')
const readCache = require('./readCache')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = performance.now()

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
        const { theme, layoutHierarchy } = siteConfig
        const [err, results] = await promiseCatcher(
          Promise.all([
            promiseThemeManifest(root, theme),
            readLayouts(root, layoutHierarchy)
          ])
        )
        if (err) {
          return callback(err)
        }

        const [themeManifest, { layouts, layoutHash }] = results
        const { 'client.js': clientJs, ...others } = themeManifest
        callback(null, {
          cache,
          okmarvinConfig,
          siteConfig,
          files,
          clientJsManifest: { 'client.js': clientJs },
          themeManifest: { ...others },
          layoutHash,
          layouts
        })
      }
    ],
    (err, results) => {
      if (err) return callback(err)

      logger.success(`Read in ${prettyTime(performance.now() - begin)}`)
      callback(null, { ...conn, ...results })
    }
  )
}
