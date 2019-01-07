const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseCatcher = require('../../../helpers/promiseCatcher')
const defaultSiteConfig = require('./defaultSiteConfig')
const path = require('path')
const ajv = require('../../../helpers/ajv')
const siteConfigSchema = require('../../../schemas/siteConfig')
const logger = require('@parcel/logger')

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

  callback(null, {
    ...siteConfig
  })
}
