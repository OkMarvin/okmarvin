const isPost = require('../parseData/isPost')
const composePaginator = require('./composePaginator')
module.exports = function (data, callback) {
  const { siteConfig, files, now } = data
  const { themeManifest } = siteConfig
  // if no index.js template, no need to compose indexList
  if (!themeManifest['index.js']) return callback(null, [])
  const { paginate } = siteConfig
  const list = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  const fields = {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    template: 'index.js',
    css: 'index.css',
    datePublished: now,
    dateModified: now,
    permalink: '/'
  }
  // which data an index page would need?
  const permalinkFormat = '/page:num/'
  composePaginator(fields, permalinkFormat, list, paginate, callback)
}
