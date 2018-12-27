const isPost = require('../parse/isPost')
const shrink = require('../helpers/shrink')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn, callback) {
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
    permalink: '/'
  }
  const permalinkFormat = '/page:num/'
  const data = files
    .filter(isPost)
    .map(shrink)
    .sort((a, b) => b.datePublished - a.datePublished)

  callback(null, paginateFactory(data, paginate, fields, permalinkFormat))
}
