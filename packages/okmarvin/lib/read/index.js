const path = require('path')
const fs = require('fs-extra')
const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')
const requireResolve = require('../helpers/requireResolve')

const promiseFileData = require('./promiseFileData')
const promiseCatcher = require('../helpers/promiseCatcher')
const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseFilesPath = require('./promiseFilesPath')
const promiseThemeManifest = require('./promiseThemeManifest')

const readOkmarvinConfig = require('./readOkmarvinConfig')

const defaultSiteConfig = require('./defaultSiteConfig')

const ajv = require('../helpers/ajv')

const siteConfigSchema = require('../schemas/siteConfig')
/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = Date.now()
  const { root, from } = conn
  const fromPath = path.join(root, from)

  if (!fs.existsSync(fromPath)) {
    // user should fix it
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
              // cache for better build performance when `clean` option set to false
              // will be removed if not work
              fs.readJson(path.join(root, '_cache.json'), (err, data) => {
                if (err) return callback(null, { lastThemeManifest: {} }) // return a default one
                return callback(null, data)
              })
            },
            okmarvinConfig: callback => readOkmarvinConfig(root, callback),
            siteConfig: async callback => {
              const result = await promiseCatcher(
                promiseUserSiteConfig(path.join(root, '_config.toml'))
              )
              if (result.length === 1) {
                return callback(result[0])
              }
              // here we want to make sure _config.toml has correct data
              if (!ajv.validate(siteConfigSchema, result[1])) {
                logger.warn(
                  'You have invalid configuration in _config.toml'
                )
                return console.log(ajv.errors)
              }
              const siteConfig = { ...defaultSiteConfig, ...result[1] }
              const themeManifestResult = await promiseCatcher(
                promiseThemeManifest(root, siteConfig.theme)
              )
              if (themeManifestResult.length === 1) {
                return callback(themeManifestResult[0])
              }
              callback(null, {
                ...siteConfig,
                themeManifest: themeManifestResult[1]
              })
            },
            files: async callback => {
              const result = await promiseCatcher(promiseFilesPath(fromPath))
              if (result.length === 1) {
                return callback(result[0])
              }
              const filesResult = await promiseCatcher(
                Promise.all(
                  result[1].map(filePath => promiseFileData(filePath))
                )
              )
              if (filesResult.length === 1) {
                return callback(filesResult[0])
              }
              callback(null, filesResult[1])
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
