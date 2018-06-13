const computeTemplate = require('../parseData/computeTemplate')
const computeCss = require('../parseData/computeCss')
const isPost = require('../parseData/isPost')
const composePaginator = require('./composePaginator')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  const { paginate } = siteConfig
  const list = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  const date = new Date().getTime()
  const fields = {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    template: computeTemplate(siteConfig.themeManifest, 'index'),
    css: computeCss(siteConfig.themeManifest, 'index'),
    datePublished: date,
    dateModified: date,
    permalink: '/'
  }
  // which data an index page would need?
  const permalinkFormat = '/page:num/'
  composePaginator(fields, permalinkFormat, list, paginate, callback)
}
