const async = require('async')
const collectTags = require('../parseData/collectTags')
const computeTemplate = require('../parseData/computeTemplate')
const computeCss = require('../parseData/computeCss')
const slug = require('@okmarvin/slug')
const composePaginator = require('./composePaginator')
module.exports = function (data, callback) {
  const { files, siteConfig } = data
  const { paginate, themeManifest } = siteConfig
  // if no tag.js, no need to compose tags page
  if (!themeManifest['tag.js']) return callback(null, [])
  const date = new Date().getTime()
  async.waterfall(
    [
      callback => collectTags(files, callback),
      (topics, callback) => {
        // TODO
        async.map(
          Object.keys(topics),
          (topic, callback) => {
            const fields = {
              title: topic,
              desciption: '',
              author: siteConfig.auhor,
              template: computeTemplate(themeManifest, 'tag'),
              css: computeCss(themeManifest, 'tag'),
              datePublished: date,
              dateModified: date,
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
