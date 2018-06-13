const generateSitemap = require('@okmarvin/generate-sitemap')
module.exports = function (data, callback) {
  callback(null, [{
    permalink: '/sitemap.xml',
    html: generateSitemap(data)
  }])
}
