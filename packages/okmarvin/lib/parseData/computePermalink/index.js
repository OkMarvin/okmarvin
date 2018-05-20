const replaceTitle = require('./replaceTitle')
const replaceYear = require('./replaceYear')
const replaceMonth = require('./replaceMonth')
const replaceDay = require('./replaceDay')
const replaceCategory = require('./replaceCategory')
module.exports = function (siteConfig, data) {
  let permalink = data.permalink || siteConfig.permalink
  permalink = replaceTitle(permalink, data)
  permalink = replaceYear(permalink, data)
  permalink = replaceMonth(permalink, data)
  permalink = replaceDay(permalink, data)
  permalink = replaceCategory(permalink, data)
  return permalink
}
