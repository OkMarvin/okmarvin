'use strict'

const logger = require('@parcel/logger')
const async = require('neo-async')
const promiseCatcher = require('@okmarvin/promise-catcher')
const { prettyTime } = require('@okmarvin/helpers')

const readSite = require('./readSite')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const promiseThemeManifest = require('./promiseThemeManifest')
const readCache = require('./readCache')

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
            cache: callback => readCache(conn, callback),
            okmarvinConfig: callback => readOkmarvinConfig(conn, callback),
            site: callback => readSite(conn, callback),
            filesWithAssets: callback => readFiles(conn, callback)
          },
          callback
        ),
      async (
        { cache, okmarvinConfig, site, filesWithAssets: { files, fileAssets } },
        callback
      ) => {
        if (conn.devHook) {
          return callback(null, {
            cache,
            okmarvinConfig,
            site,
            files,
            fileAssets,
            clientJsManifest: { 'client.js': '' },
            themeManifest: {
              'index.js': 'index.js',
              'post.js': 'post.js',
              'page.js': 'page.js',
              'category.js': 'category.js',
              'tag.js': 'tag.js',
              'author.js': 'author.js',
              '404.js': '404.js'
            }
          })
        }
        let [err, themeManifest] = await promiseCatcher(
          promiseThemeManifest(conn.root, site.theme)
        )
        if (err) {
          return callback(err)
        }

        const { 'client.js': clientJs, ...others } = themeManifest
        callback(null, {
          cache,
          okmarvinConfig,
          site,
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
