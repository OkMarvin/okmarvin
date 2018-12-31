const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseCatcher = require('../../../helpers/promiseCatcher')
const promiseThemeManifest = require('./promiseThemeManifest')
const defaultSiteConfig = require('./defaultSiteConfig')
const path = require('path')
const ajv = require('../../../helpers/ajv')
const siteConfigSchema = require('../../../schemas/siteConfig')
const logger = require('@parcel/logger')

const readLayouts = require('./readLayouts')

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
  const data = await Promise.all([
    promiseThemeManifest(root, siteConfig.theme),
    readLayouts(root, siteConfig.layoutHierarchy)
  ])
  if (data.length === 1) {
    return callback(data[0])
  }
  const [themeManifest, { layouts, layoutHash }] = data
  callback(null, {
    ...siteConfig,
    themeManifest,
    layouts,
    layoutHash
  })
}
