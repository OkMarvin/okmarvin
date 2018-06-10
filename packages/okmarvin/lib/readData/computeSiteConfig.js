const yaml = require('js-yaml')
const normalizePermalink = require('../parseData/computePermalink/normalizePermalink')
module.exports = (yml, callback) => {
  const defaultSiteConfig = require('./defaultSiteConfig')
  try {
    const siteConfig = yaml.safeLoad(yml)
    if (!siteConfig) return callback(null, defaultSiteConfig)
    callback(
      null,
      Object.assign(
        {},
        defaultSiteConfig,
        Object.assign(
          {},
          siteConfig,
          siteConfig.menu
            ? {
              menu: siteConfig.menu.map(m => ({
                ...m,
                permalink: normalizePermalink(m.permalink)
              }))
            }
            : {}
        )
      )
    )
  } catch (e) {
    if (e instanceof yaml.YAMLException) {
      // yaml syntax problem, should be fixed
      throw e
    } else {
      callback(e)
    }
  }
}
