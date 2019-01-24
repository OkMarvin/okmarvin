'use strict'
const collector = require('./collector')
module.exports = conn => {
  const { files, themeManifest } = conn
  const tags = collector(files, 'tags')
  let results = { ...conn, tags }
  if (themeManifest['category.js']) {
    results = { ...results, categories: collector(files, 'categories') }
  }
  if (themeManifest['author.js']) {
    results = { ...results, authors: collector(files, 'author') }
  }
  return results
}
