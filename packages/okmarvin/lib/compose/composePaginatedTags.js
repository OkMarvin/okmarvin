const async = require('async')
const collectTags = require('../parse/collectTags')
const slug = require('@okmarvin/slug')
const isPost = require('../parse/isPost')
const chunk = require('lodash/chunk')
const shrink = require('../helpers/shrink')
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
            if (!paginate || (paginate && list.length < paginate + 1)) {
              return callback(null, [
                {
                  ...fields,
                  list
                }
              ])
            }
            const arr = chunk(list, paginate)
            let result = []
            for (let i = 0; i < arr.length; i++) {
              let paginator = {
                current: i + 1,
                total: arr.length,
                permalinkFormat
              }
              if (i === 0) {
                result = result.concat({
                  ...fields,
                  list: arr[i],
                  paginator
                })
              } else {
                result = result.concat({
                  ...fields,
                  title: `${fields.title} - Page ${i + 1}`,
                  list: arr[i],
                  paginator,
                  permalink: permalinkFormat.replace(/:num/, i + 1)
                })
              }
            }
            callback(null, result)
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
