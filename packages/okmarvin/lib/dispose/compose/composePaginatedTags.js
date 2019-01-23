'use strict'
const slug = require('@okmarvin/slug')
const { isPost, shrink } = require('@okmarvin/helpers')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn) {
  const {
    siteConfig: { author, paginate },
    builtAt,
    tags
  } = conn
  return Object.keys(tags).reduce((acc, topic) => {
    const fields = {
      title: topic,
      description: '',
      author: author,
      template: 'tag.js',
      css: 'tag.css',
      datePublished: builtAt,
      dateModified: builtAt,
      permalink: `/topics/${encodeURIComponent(slug(topic))}/`,
      dirty: true
    }
    const permalinkFormat = `/topics/${encodeURIComponent(
      slug(topic)
    )}/page:num/`
    const data = tags[topic]
      .filter(isPost)
      .map(shrink)
      .sort((a, b) => b.datePublished - a.datePublished)
    return [...acc, ...paginateFactory(data, paginate, fields, permalinkFormat)]
  }, [])
}
