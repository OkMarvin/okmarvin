const generateSitemap = require('@okmarvin/generate-sitemap')
module.exports = function (conn, callback) {
  callback(null, {
    permalink: '/sitemap.xml',
    html: generateSitemap(conn),
    dirty: true
  })
}
