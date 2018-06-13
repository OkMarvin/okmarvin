const replaceTitle = require('./replaceTitle')
const replaceYear = require('./replaceYear')
const replaceMonth = require('./replaceMonth')
const replaceDay = require('./replaceDay')
const replaceCategory = require('./replaceCategory')
const replaceDir = require('./replaceDir')
const replaceFilename = require('./replaceFilename')
const path = require('path')
const normalizePermalink = require('./normalizePermalink')
module.exports = function (siteConfig, fileData, relativePath) {
  let permalink = fileData.permalink || siteConfig.permalink
  const { title, categories } = fileData
  permalink = replaceTitle(permalink, title)
  permalink = replaceYear(permalink, fileData)
  permalink = replaceMonth(permalink, fileData)
  permalink = replaceDay(permalink, fileData)
  permalink = replaceCategory(permalink, categories)
  permalink = replaceDir(permalink, path.dirname(relativePath))
  permalink = replaceFilename(permalink, path.parse(relativePath).name)
  return normalizePermalink(path.normalize(permalink))
}
