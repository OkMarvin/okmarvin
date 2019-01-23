'use strict'
const collector = require('./collector')
module.exports = (conn) => {
  const { files } = conn
  const tags = collector(files, 'tags')
  const categories = collector(files, 'categories')
  const authors = collector(files, 'author')
  return { ...conn, tags, categories, authors }
}
