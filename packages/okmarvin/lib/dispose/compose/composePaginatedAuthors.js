'use strict'

const slug = require('@okmarvin/slug')
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateRobot = require('./paginateRobot')
module.exports = (conn) => {
  const {
    site: { paginate },
    builtAt,
    authors
  } = conn
  return Object.keys(authors).reduce((acc, author) => {
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
    return [...acc, ...paginateRobot(data, paginate, fields, permalinkFormat)]
  }, [])
}
