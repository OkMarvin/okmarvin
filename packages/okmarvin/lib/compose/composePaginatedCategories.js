const async = require('async')
const slug = require('@okmarvin/slug')
const isPost = require('../parse/isPost')
const shrink = require('../helpers/shrink')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn, callback) {
  const {
    siteConfig: { author, paginate },
    builtAt,
    categories
  } = conn

  async.map(
    Object.keys(categories),
    (category, callback) => {
      const fields = {
        title: category,
        description: '',
        author: author,
        template: 'category.js',
        css: 'category.css',
        datePublished: builtAt,
        dateModified: builtAt,
        permalink: `/topics/${encodeURIComponent(slug(category))}/`
      }
      const permalinkFormat = `/categories/${encodeURIComponent(
        slug(category)
      )}/page:num/`
      const data = categories[category]
        .filter(isPost)
        .map(shrink)
        .sort((a, b) => b.datePublished - a.datePublished)

      callback(null, paginateFactory(data, paginate, fields, permalinkFormat))
    },
    function (err, files) {
      if (err) return callback(err)
      callback(null, files.reduce((acc, file) => acc.concat(file), []))
    }
  )
}
