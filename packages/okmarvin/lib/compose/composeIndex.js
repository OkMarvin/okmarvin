const isPost = require('../parse/isPost')
const composePaginator = require('./composePaginator')
module.exports = function (conn, callback) {
  const {
    siteConfig: { title, description, author, paginate },
    files,
    builtAt
  } = conn
  const list = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  const fields = {
    title: title,
    description: description,
    author: author,
    template: 'index.js',
    css: 'index.css',
    datePublished: builtAt,
    dateModified: builtAt,
    permalink: '/'
  }
  // which data an index page would need?
  const permalinkFormat = '/page:num/'
  composePaginator(fields, permalinkFormat, list, paginate, callback)
}
