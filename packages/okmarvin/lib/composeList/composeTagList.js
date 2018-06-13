const async = require('async')
const collectTags = require('../parseData/collectTags')
const slug = require('@okmarvin/slug')
const composePaginator = require('./composePaginator')
module.exports = function (data, callback) {
  const { files, siteConfig, now } = data
  const { paginate, themeManifest } = siteConfig
  // if no tag.js template, no need to compose tagList
  if (!themeManifest['tag.js']) return callback(null, [])
  async.waterfall(
    [
      callback => collectTags(files, callback),
      (topics, callback) => {
        async.map(
          Object.keys(topics),
          (topic, callback) => {
            const fields = {
              title: topic,
              desciption: '',
              author: siteConfig.auhor,
              template: 'tag.js',
              css: 'tag.css',
              datePublished: now,
              dateModified: now,
              permalink: `/topics/${encodeURIComponent(slug(topic))}/`,
              list: topics[topic].sort((a, b) => b.datePublished - a.datePublished)
            }
            const permalinkFormat = `/topics/${encodeURIComponent(
              slug(topic)
            )}/page:num/`
            composePaginator(fields, permalinkFormat, topics[topic], paginate, callback)
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
