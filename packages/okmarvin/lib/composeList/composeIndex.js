const computeTemplate = require('../parseData/computeTemplate')
const computeCss = require('../parseData/computeCss')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  // which data an index page would need?
  callback(null, {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    permalink: '',
    template: computeTemplate(siteConfig.themeManifest, 'index'),
    css: computeCss(siteConfig.themeManifest, 'index'),
    list: files
      .filter(file => file.template === 'post.js')
      .sort((a, b) => b.datePublished - a.datePublished)
  })
}
