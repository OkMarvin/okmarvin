const async = require('async')
const slug = require('@okmarvin/slug')
const isPost = require('../parse/isPost')
const shrink = require('../../helpers/shrink')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn, callback) {
  const {
    siteConfig: { author, paginate },
    builtAt,
    tags
  } = conn
  async.map(
    Object.keys(tags),
    (topic, callback) => {
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
      callback(null, paginateFactory(data, paginate, fields, permalinkFormat))
    },
    function (err, files) {
      if (err) return callback(err)
      callback(null, files.reduce((acc, file) => acc.concat(file), []))
    }
  )
}
