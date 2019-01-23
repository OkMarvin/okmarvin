'use strict'
const slug = require('@okmarvin/slug')
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateFactory = require('./paginateFactory')
module.exports = (conn) => {
  const {
    siteConfig: { author, paginate },
    builtAt,
    categories
  } = conn
  return Object.keys(categories).reduce((acc, category) => {
    const fields = {
      title: category,
      description: '',
      author: author,
      template: 'category.js',
      css: 'category.css',
      datePublished: builtAt,
      dateModified: builtAt,
      permalink: `/categories/${encodeURIComponent(slug(category))}/`,
      dirty: true
    }
    const permalinkFormat = `/categories/${encodeURIComponent(
      slug(category)
    )}/page:num/`
    const data = categories[category]
      .filter(isPost)
      .map(shrink)
      .sort((a, b) => b.datePublished - a.datePublished)
    return [...acc, ...paginateFactory(data, paginate, fields, permalinkFormat)]
  }, [])
}
