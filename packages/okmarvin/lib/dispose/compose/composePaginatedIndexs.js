'use strict'
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateRobot = require('./paginateRobot')
module.exports = function (conn) {
  const {
    site: { title, description, author, paginate },
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

  return paginateRobot(data, paginate, fields, permalinkFormat)
}
