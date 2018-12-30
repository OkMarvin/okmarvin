const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseCatcher = require('../../helpers/promiseCatcher')
const promiseThemeManifest = require('./promiseThemeManifest')
const defaultSiteConfig = require('./defaultSiteConfig')
const path = require('path')
const ajv = require('../../helpers/ajv')
const siteConfigSchema = require('../../schemas/siteConfig')
const logger = require('@parcel/logger')

module.exports = async ({ root }, callback) => {
  const result = await promiseCatcher(
    promiseUserSiteConfig(path.join(root, '_config.toml'))
  )
  if (result.length === 1) {
    return callback(result[0])
  }
  // here we want to make sure _config.toml has correct data
  if (!ajv.validate(siteConfigSchema, result[1])) {
    logger.warn('You have invalid configuration in _config.toml')
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
}
