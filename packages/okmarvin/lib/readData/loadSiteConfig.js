/**
 * Site config can be loaded from siteConfig.yml
 * the order is: siteConfig.yml > defaultSiteConfig
 */
// TODO add test
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
module.exports = (cwd, callback) => {
  const defaultSiteConfig = require('./defaultSiteConfig')
  let siteConfig = {}
  try {
    siteConfig = yaml.safeLoad(
      fs.readFileSync(path.join(cwd, 'siteConfig.yml'), 'utf8')
    )
  } catch (e) {
    if (e instanceof yaml.YAMLException) {
      // yaml syntax problem, should be fixed
      throw e
    }
  }
  callback(
    null,
    Object.assign({}, defaultSiteConfig, siteConfig)
  )
}
