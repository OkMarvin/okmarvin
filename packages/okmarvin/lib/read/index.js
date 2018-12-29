const path = require('path')
const fs = require('fs-extra')
const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')
const requireResolve = require('../helpers/requireResolve')

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
  const begin = Date.now()

  if (!fs.existsSync(absoluteContentPath)) {
    // user should fix it, no need to log error stack
    return logger.warn(
      `Oops, nothing to do because "${from}" directory does not exist.`
    )
  }
  async.waterfall(
    [
      callback =>
        async.parallel(
          {
            cache: callback => {
              fs.readJson(
                path.join(root, '_cache.json'),
                (err, data) => {
                  if (err) return callback(null, { lastThemeManifest: {} })
                  return callback(null, data)
                }
              )
            },
            okmarvinConfig: async callback => {
              const [err, okmarvinConfig] = await promiseCatcher(
                promiseOkmarvinConfig(root)
              )
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
                return logger.warn(
                  'You have invalid configuration in _config.toml:\n',
                  ajv.errors
                )
              }
              const siteConfig = { ...defaultSiteConfig, ...userSiteConfig }
              const [
                readThemeManifestErr,
                themeManifest
              ] = await promiseCatcher(
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
                Promise.all(
                  filesPath.map(filePath => promiseFileData(filePath))
                )
              )
              if (!files) {
                return callback(readMarkdownErr)
              }
              callback(null, files)
            }
          },
          callback
        ),
      (results, callback) => {
        const {
          siteConfig: { layoutHierarchy }
        } = results
        const findMe = [
          ...new Set(
            Object.values(layoutHierarchy).reduce(function (flat, toFlatten) {
              return flat.concat(toFlatten)
            }, [])
          )
        ]
        const layouts = {}
        const layoutPath = path.join(__dirname, '..', 'layout')
        findMe.forEach(file => {
          // first resolve root/layout
          try {
            const layout = requireResolve(file, {
              paths: [path.join(root, 'layout'), layoutPath]
            })
            layouts[file] = require(layout)
          } catch (_err) {
            // do nothing
          }
        })
        callback(null, { ...results, layouts })
      }
    ],
    (err, results) => {
      if (err) return callback(err)
      logger.success(`Read in ${prettyTime(Date.now() - begin)}`)
      callback(null, { ...conn, ...results })
    }
  )
}
