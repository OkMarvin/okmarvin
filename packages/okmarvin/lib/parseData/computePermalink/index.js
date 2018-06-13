const replaceTitle = require('./replaceTitle')
const replaceYear = require('./replaceYear')
const replaceMonth = require('./replaceMonth')
const replaceDay = require('./replaceDay')
const replaceCategory = require('./replaceCategory')
const replaceDir = require('./replaceDir')
const replaceFilename = require('./replaceFilename')
const path = require('path')
const normalizePermalink = require('./normalizePermalink')
module.exports = function (siteConfig, data, relativePath) {
  let permalink = data.permalink || siteConfig.permalink
  const {title} = data
  permalink = replaceTitle(permalink, title)
  permalink = replaceYear(permalink, data)
  permalink = replaceMonth(permalink, data)
  permalink = replaceDay(permalink, data)
  permalink = replaceCategory(permalink, data)
  permalink = replaceDir(permalink, path.dirname(relativePath))
  permalink = replaceFilename(permalink, path.parse(relativePath).name)
  return normalizePermalink(path.normalize(permalink))
}
