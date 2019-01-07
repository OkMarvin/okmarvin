const promiseUserSiteConfig = require('./promiseUserSiteConfig')
const promiseCatcher = require('@okmarvin/promise-catcher')
const defaultSiteConfig = require('./defaultSiteConfig')
const path = require('path')
const ajv = require('../../../helpers/ajv')
const siteConfigSchema = require('../../../schemas/siteConfig')
const logger = require('@parcel/logger')

module.exports = async ({ root }, callback) => {
  const [err, userSiteConfig] = await promiseCatcher(
    promiseUserSiteConfig(path.join(root, '_config.toml'))
  )
  if (err) {
    return callback(err)
  }
  // here we want to make sure _config.toml has correct data
  if (!ajv.validate(siteConfigSchema, userSiteConfig)) {
    logger.warn('You have invalid configuration in _config.toml')
    return console.log(ajv.errors)
  }

  callback(null, { ...defaultSiteConfig, ...userSiteConfig })
}
