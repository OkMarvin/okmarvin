const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const async = require('neo-async')
const invariant = require('invariant')
const readUserSiteConfig = require('./readUserSiteConfig')
const normalizePermalink = require('../parseData/computePermalink/normalizePermalink')
const readMarkdown = require('./readMarkdown')
const readThemeManifest = require('./readThemeManifest')
const chalk = require('chalk')
const configStore = require('../configStore')
/**
 * Collect all markdown files under `post` & `page`
 * @param {String} cwd current working directory
 * @param {Function} callback
 */
module.exports = function (callback = function () {}) {
  const { cwd, source } = configStore.get()
  const content = path.join(cwd, source)
  invariant(
    fse.pathExistsSync(content),
    chalk.red(`${content} folder doesn't exist`)
  )

  async.parallel(
    {
      config: callback => {
        // read custom config from .okmarvin/config.js
        try {
          const config = require(path.join(cwd, '.okmarvin', 'config.js'))
          callback(null, config)
        } catch (e) {
          callback(null, undefined)
        }
      },
      siteConfig: callback => {
        async.waterfall(
          [
            callback => {
              async.parallel(
                {
                  userSiteConfig: callback =>
                    readUserSiteConfig(
                      path.join(cwd, '_config.toml'),
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
      files: callback =>
        async.waterfall(
          [
            callback => {
              const searchPattern = '{post,page}/**/*.md'
              const opts = { cwd: content, absolute: true }
              glob(searchPattern, opts, callback)
              // require('tiny-glob')(searchPattern, opts).then(files => {
              //   console.log(files)
              //   callback(null, files)
              // }).catch(err => callback(err))
            },
            (files, callback) => async.map(files, readMarkdown, callback)
          ],
          callback
        )
    },
    callback
  )
}
