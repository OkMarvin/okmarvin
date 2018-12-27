const async = require('async')
const collectTags = require('../parse/collectTags')
const slug = require('@okmarvin/slug')
const isPost = require('../parse/isPost')
const shrink = require('../helpers/shrink')
const paginateFactory = require('./paginateFactory')
module.exports = function (conn, callback) {
  const {
    files,
    siteConfig: { author, paginate },
    builtAt
  } = conn
  async.waterfall(
    [
      callback => collectTags(files, callback),
      (topics, callback) => {
        async.map(
          Object.keys(topics),
          (topic, callback) => {
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
            const list = topics[topic]
              .filter(isPost)
              .map(shrink)
              .sort((a, b) => b.datePublished - a.datePublished)

            callback(null, paginateFactory(list, paginate, fields, permalinkFormat))
          },
          function (err, files) {
            if (err) return callback(err)
            callback(null, files.reduce((acc, file) => acc.concat(file), []))
          }
        )
      }
    ],
    callback
  )
}
