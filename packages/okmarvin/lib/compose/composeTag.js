const async = require('async')
const collectTags = require('../parse/collectTags')
const slug = require('@okmarvin/slug')
const composePaginator = require('./composePaginator')
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
              permalink: `/topics/${encodeURIComponent(slug(topic))}/`,
              list: topics[topic].sort(
                (a, b) => b.datePublished - a.datePublished
              )
            }
            const permalinkFormat = `/topics/${encodeURIComponent(
              slug(topic)
            )}/page:num/`
            composePaginator(
              fields,
              permalinkFormat,
              topics[topic],
              paginate,
              callback
            )
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