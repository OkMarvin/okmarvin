const path = require('path')
const fse = require('fs-extra')
const async = require('neo-async')
const normalizePermalink = require('../parse/computePermalink/normalizePermalink')
const readMarkdown = require('./readMarkdown')
const readThemeManifest = require('./readThemeManifest')

const promiseCatcher = require('../helpers/promiseCatcher')
const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
const promiseFilesPath = require('./promiseFilesPath')

const defaultSiteConfig = require('./defaultSiteConfig')

const ajv = require('../helpers/ajv')

const siteConfigSchema = require('../schemas/siteConfig')

module.exports = async function (conn, callback) {
  const { root, from } = conn
  const absoluteContentPath = path.join(root, from)

  if (!fse.pathExistsSync(absoluteContentPath)) {
    return console.log(
      `Oops, nothing I can do because "${from}" folder does not exist :(`
    )
  }

  async.parallel(
    {
      config: async callback => {
        const [err, config] = await promiseCatcher(promiseOkmarvinConfig(root))
        if (!config) {
          return callback(err)
        }
        callback(null, config)
      },
      siteConfig: callback => {
        async.waterfall(
          [
            async callback => {
              const [err, userSiteConfig] = await promiseCatcher(
                promiseUserSiteConfig(path.join(root, '_config.toml'))
              )
              if (!userSiteConfig) {
                // oops something wrong with _config.toml
                return callback(err)
              }
              // here we want to make sure _config.toml has correct data
              if (!ajv.validate(siteConfigSchema, userSiteConfig)) {
                return console.log(
                  'You have invalid configuration in _config.toml:\n',
                  ajv.errors
                )
              }
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
            },
            readThemeManifest
          ],
          callback
        )
      },
      files: async callback => {
        // we might need pattern matching to catch error here
        // https://github.com/tc39/proposal-pattern-matching
        const [readFilesPathErr, filesPath] = await promiseCatcher(
          promiseFilesPath(absoluteContentPath)
        )
        if (!filesPath) {
          return callback(readFilesPathErr)
        }
        const [readMarkdownErr, files] = await promiseCatcher(
          Promise.all(filesPath.map(filePath => readMarkdown(filePath)))
        )
        if (!files) {
          return callback(readMarkdownErr)
        }
        callback(null, files)
      }
    },
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...conn, ...results })
    }
  )
}
