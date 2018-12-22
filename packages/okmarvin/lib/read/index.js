const path = require('path')
const fs = require('fs')
const async = require('neo-async')

const promiseFileData = require('./promiseFileData')
const promiseCatcher = require('../helpers/promiseCatcher')
const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
const promiseFilesPath = require('./promiseFilesPath')
const promiseThemeManifest = require('./promiseThemeManifest')

const defaultSiteConfig = require('./defaultSiteConfig')

const ajv = require('../helpers/ajv')

const siteConfigSchema = require('../schemas/siteConfig')

module.exports = async function (conn, callback) {
  const { root, from } = conn
  const absoluteContentPath = path.join(root, from)

  if (!fs.existsSync(absoluteContentPath)) {
    return callback(
      new Error(
        `Oops, nothing I can do because "${from}" folder does not exist :(`
      )
    )
  }

  async.parallel(
    {
      okmarvinConfig: async callback => {
        const [err, okmarvinConfig] = await promiseCatcher(promiseOkmarvinConfig(root))
        if (!okmarvinConfig) {
          return callback(err)
        }
        callback(null, okmarvinConfig)
      },
      siteConfig: async callback => {
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
        const siteConfig = { ...defaultSiteConfig, ...userSiteConfig }
        const [readThemeManifestErr, themeManifest] = await promiseCatcher(
          promiseThemeManifest(root, siteConfig.theme)
        )
        if (!themeManifest) {
          return callback(readThemeManifestErr)
        }
        callback(null, { ...siteConfig, themeManifest: themeManifest })
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
          Promise.all(filesPath.map(filePath => promiseFileData(filePath)))
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
