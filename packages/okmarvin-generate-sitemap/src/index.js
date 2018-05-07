const fs = require('fs')
const path = require('path')
const generateXml = require('@okmarvin/generate-xml')
module.exports = data => {
  const template = fs.readFileSync(path.resolve(__dirname, 'sitemap.ejs'), {
    encoding: 'utf-8'
  })
  return generateXml(template, data)
}
