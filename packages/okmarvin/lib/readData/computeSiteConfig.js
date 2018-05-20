const yaml = require('js-yaml')
module.exports = (yml, callback) => {
  const defaultSiteConfig = require('./defaultSiteConfig')
  let siteConfig = {}
  try {
    siteConfig = yaml.safeLoad(
      yml
    )
    callback(
      null,
      Object.assign({}, defaultSiteConfig, siteConfig)
    )
  } catch (e) {
    if (e instanceof yaml.YAMLException) {
      // yaml syntax problem, should be fixed
      throw e
    }
  }
}
