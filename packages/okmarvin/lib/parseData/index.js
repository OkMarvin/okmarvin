const async = require('neo-async')
const computeAuthor = require('./computeAuthor')
const computeDatePublished = require('./computeDatePublished')
const computeDateModified = require('./computeDateModified')
const computeDescription = require('./computeDescription')
const computeToc = require('./computeToc')
const computePermalink = require('./computePermalink')
const computeTemplate = require('./computeTemplate')
const md = require('./md')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  const { themeManifest } = siteConfig
  async.waterfall(
    [
      callback => {
        async.map(
          files,
          function (file, callback) {
            const [filePath, { data, content }] = file
            callback(null, {
              ...data,
              author: computeAuthor(siteConfig, data),
              datePublished: computeDatePublished(data),
              dateModified: computeDateModified(data),
              description: computeDescription(data, content),
              permalink: computePermalink(siteConfig, data),
              template: computeTemplate(themeManifest, data, filePath),
              content: computeToc(siteConfig, data)
                ? md.render(`{:toc}\n${content}`)
                : md.render(content)
            })
          },
          callback
        )
      }
    ],
    (err, files) => {
      if (err) return callback(err)
      callback(null, {
        ...data,
        siteConfig,
        files
      })
    }
  )
}
