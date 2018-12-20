const replaceTitle = require('./replaceTitle')
const replaceYear = require('./replaceYear')
const replaceMonth = require('./replaceMonth')
const replaceDay = require('./replaceDay')
const replaceCategory = require('./replaceCategory')
const replaceDir = require('./replaceDir')
const replaceFilename = require('./replaceFilename')
const path = require('path')
const normalizePermalink = require('./normalizePermalink')
module.exports = function (fallbackPermalink, fileData, datePublished, relativePath) {
  let permalink = fileData.permalink || fallbackPermalink
  const { title, categories } = fileData
  permalink = replaceTitle(permalink, title)
  permalink = replaceYear(permalink, datePublished.getFullYear())
  permalink = replaceMonth(permalink, datePublished.getMonth() + 1)
  permalink = replaceDay(permalink, datePublished.getDate())
  permalink = replaceCategory(permalink, categories)
  permalink = replaceDir(permalink, path.dirname(relativePath))
  permalink = replaceFilename(permalink, path.parse(relativePath).name)
  return normalizePermalink(path.normalize(permalink))
}
