const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseCatcher = require('../../../helpers/promiseCatcher')
const promiseThemeManifest = require('./promiseThemeManifest')
const promiseClientJsManifest = require('./promiseClientJsManifest')
const defaultSiteConfig = require('./defaultSiteConfig')
const path = require('path')
const ajv = require('../../../helpers/ajv')
const siteConfigSchema = require('../../../schemas/siteConfig')
const logger = require('@parcel/logger')

const readLayouts = require('./readLayouts')

module.exports = async ({ root }, callback) => {
  const [errFromReadingUserSiteConfig, userSiteConfig] = await promiseCatcher(
    promiseUserSiteConfig(path.join(root, '_config.toml'))
  )
  if (errFromReadingUserSiteConfig) {
    return callback(errFromReadingUserSiteConfig)
  }
  // here we want to make sure _config.toml has correct data
  if (!ajv.validate(siteConfigSchema, userSiteConfig)) {
    logger.warn('You have invalid configuration in _config.toml')
    return console.log(ajv.errors)
  }
  const siteConfig = { ...defaultSiteConfig, ...userSiteConfig }
  const [err, data] = await promiseCatcher(
    Promise.all([
      promiseThemeManifest(root, siteConfig.theme),
      readLayouts(root, siteConfig.layoutHierarchy),
      promiseClientJsManifest(root, siteConfig.theme)
    ])
  )
  if (err) {
    return callback(err)
  }
  const [themeManifest, { layouts, layoutHash }, clientJsManifest] = data
  callback(null, {
    ...siteConfig,
    themeManifest,
    clientJsManifest,
    layouts,
    layoutHash
  })
}
