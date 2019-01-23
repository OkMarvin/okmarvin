'use strict'
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn) {
  const {
    siteConfig: { title, description, author, paginate },
    files,
    builtAt
  } = conn
  const fields = {
    title: title,
    description: description,
    author: author,
    template: 'index.js',
    css: 'index.css',
    datePublished: builtAt,
    dateModified: builtAt,
    permalink: '/',
    dirty: true
  }
  const permalinkFormat = '/page:num/'
  const data = files
    .filter(isPost)
    .map(shrink)
    .sort((a, b) => b.datePublished - a.datePublished)

  return paginateFactory(data, paginate, fields, permalinkFormat)
}
