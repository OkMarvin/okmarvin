const path = require('path')
const fse = require('fs-extra')
const async = require('neo-async')
const readUserSiteConfig = require('./readUserSiteConfig')
const normalizePermalink = require('../parse/computePermalink/normalizePermalink')
const readMarkdown = require('./readMarkdown')
const readThemeManifest = require('./readThemeManifest')
const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
const promiseFilesPath = require('./promiseFilesPath')
module.exports = async function (conn, callback = function () {}) {
  const { root, from } = conn
  const content = path.join(root, from)
  if (!fse.pathExistsSync(content)) {
    return console.log(
      `🤖 : Oops, nothing I can do because "${from}" folder does not exist :(`
    )
  }

  async.parallel(
    {
      config: async callback => {
        const config = await promiseOkmarvinConfig(root)
        callback(null, config)
      },
      siteConfig: callback => {
        async.waterfall(
          [
            callback => {
              async.parallel(
                {
                  userSiteConfig: callback =>
                    readUserSiteConfig(
                      path.join(root, '_config.toml'),
                      callback
                    ),
                  defaultSiteConfig: callback =>
                    callback(null, require('./defaultSiteConfig'))
                },
                function (err, results) {
                  if (err) return callback(err)
                  const { userSiteConfig, defaultSiteConfig } = results
                  callback(
                    null,
                    Object.assign(
                      {},
                      defaultSiteConfig,
                      Object.assign(
                        {},
                        userSiteConfig,
                        userSiteConfig.menu
                          ? {
                            menu: userSiteConfig.menu.map(m => ({
                              ...m,
                              permalink: normalizePermalink(m.permalink)
                            }))
                          }
                          : {}
                      )
                    )
                  )
                }
              )
            },
            readThemeManifest
          ],
          callback
        )
      },
      files: async callback => {
        // we can wait for pattern matching to catch error here
        const filesPath = await promiseFilesPath(content)
        const files = await Promise.all(
          filesPath.map(filePath => readMarkdown(filePath))
        )
        callback(null, files)
      }
    },
    (err, results) => {
      if (err) return callback(err)
      callback(null, conn, results)
    }
  )
}
