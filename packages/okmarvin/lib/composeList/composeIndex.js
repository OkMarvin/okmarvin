const computeTemplate = require('../parseData/computeTemplate')
module.exports = function (data, callback) {
  const {siteConfig} = data
  // which data an index page would need?
  callback(null, {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    permalink: '/',
    template: computeTemplate(siteConfig.themeManifest, 'index')
  })
}
