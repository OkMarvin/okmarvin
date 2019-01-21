'use strict'

const async = require('async')
const slug = require('@okmarvin/slug')
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateFactory = require('./paginateFactory')
module.exports = (conn, callback) => {
  const {
    siteConfig: { paginate },
    builtAt,
    authors
  } = conn

  async.map(
    Object.keys(authors),
    (author, callback) => {
      const fields = {
        title: author,
        description: '',
        author: author,
        template: 'author.js',
        css: 'author.css',
        datePublished: builtAt,
        dateModified: builtAt,
        permalink: `/authors/${encodeURIComponent(slug(author))}/`,
        dirty: true
      }
      const permalinkFormat = `/authors/${encodeURIComponent(
        slug(author)
      )}/page:num/`
      const data = authors[author]
        .filter(isPost)
        .map(shrink)
        .sort((a, b) => b.datePublished - a.datePublished)

      callback(null, paginateFactory(data, paginate, fields, permalinkFormat))
    },
    (err, files) => {
      if (err) return callback(err)
      callback(null, files.reduce((acc, file) => acc.concat(file), []))
    }
  )
}
