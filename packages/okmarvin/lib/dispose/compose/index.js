'use strict'
const composePaginatedIndexs = require('./composePaginatedIndexs')
const composePaginatedTags = require('./composePaginatedTags')
const composePaginatedCategories = require('./composePaginatedCategories')
const composePaginatedAuthors = require('./composePaginatedAuthors')
const compose404 = require('./compose404')
module.exports = (conn) => {
  const { files, themeManifest } = conn
  let composes = []
  if (themeManifest['index.js']) {
    composes = [...composes, ...composePaginatedIndexs(conn)]
  }
  if (themeManifest['category.js']) {
    composes = [...composes, ...composePaginatedCategories(conn)]
  }
  if (themeManifest['tag.js']) {
    composes = [...composes, ...composePaginatedTags(conn)]
  }
  if (themeManifest['author.js']) {
    composes = [...composes, ...composePaginatedAuthors(conn)]
  }
  if (themeManifest['404.js']) {
    composes = [...composes, ...compose404(conn)]
  }
  return { ...conn, files: files.concat(composes) }
}
