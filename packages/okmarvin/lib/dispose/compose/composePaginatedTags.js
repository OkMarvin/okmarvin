'use strict'
const slug = require('@okmarvin/slug')
const paginateRobot = require('./paginateRobot')
module.exports = function(conn) {
  const {
    site: { author, paginate, tags = [] },
    builtAt
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
      permalink: `/topics/${encodeURIComponent(slug(topic))}/`
    }
    const permalinkFormat = `/topics/${encodeURIComponent(
      slug(topic)
    )}/page:num/`
    const data = tags[topic].sort((a, b) => b.datePublished - a.datePublished)
    return [...acc, ...paginateRobot(data, paginate, fields, permalinkFormat)]
  }, [])
}
