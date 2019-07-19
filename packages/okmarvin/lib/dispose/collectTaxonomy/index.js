'use strict'
const collector = require('./collector')
module.exports = conn => {
  const { site, files, themeManifest } = conn
  const tags = collector(files, 'tags')
  let newSite = {
    ...site,
    tags
  }
  if (themeManifest['category.js']) {
    newSite = {
      ...newSite,
      categories: collector(files, 'categories')
    }
  }
  if (themeManifest['author.js']) {
    newSite = {
      ...newSite,
      authors: collector(files, 'author')
    }
  }
  return {
    ...conn,
    site: newSite
  }
}
