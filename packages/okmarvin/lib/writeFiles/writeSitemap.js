const generateSitemap = require('@okmarvin/generate-sitemap')
const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const {cwd} = data
  fs.outputFile(
    path.join(
      cwd, 'dist', 'sitemap.xml'
    ),
    generateSitemap(data),
    callback
  )
}
