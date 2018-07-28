const TOML = require('@iarna/toml')
const normalizePermalink = require('../parseData/computePermalink/normalizePermalink')
module.exports = (str, callback) => {
  const defaultSiteConfig = require('./defaultSiteConfig')
  try {
    const siteConfig = TOML.parse(str)
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
    throw e
  }
}
