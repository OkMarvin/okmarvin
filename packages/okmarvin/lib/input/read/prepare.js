const async = require('neo-async')

const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readOkmarvinConfig = require('./readOkmarvinConfig')
const promiseCatcher = require('@okmarvin/promise-catcher')
const promiseThemeManifest = require('./promiseThemeManifest')
const readLayouts = require('./readLayouts')
const readCache = require('./readCache')

module.exports = (conn, callback) =>
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
      async (data, callback) => {
        const { siteConfig } = data
        const [err, results] = await promiseCatcher(
          Promise.all([
            promiseThemeManifest(conn.root, siteConfig.theme),
            readLayouts(conn.root, siteConfig.layoutHierarchy)
          ])
        )
        if (err) {
          return callback(err)
        }
        const [themeManifest, { layouts, layoutHash }] = results
        const { 'client.js': clientJs, ...others } = themeManifest
        callback(null, {
          ...data,
          clientJsManifest: { 'client.js': clientJs },
          layoutHash,
          layouts,
          themeManifest: { ...others }
        })
      }
    ],
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...conn, ...results })
    }
  )
