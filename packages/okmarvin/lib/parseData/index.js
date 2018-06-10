const async = require('neo-async')
const computeAuthor = require('./computeAuthor')
const computeDatePublished = require('./computeDatePublished')
const computeDateModified = require('./computeDateModified')
const computeDescription = require('./computeDescription')
const computeToc = require('./computeToc')
const computePermalink = require('./computePermalink')
const computeTemplate = require('./computeTemplate')
const computeCss = require('./computeCss')
const md = require('./md')
const findSiblings = require('./findSiblings')
const findRelated = require('./findRelated')
const path = require('path')
module.exports = function (data, callback) {
  const { siteConfig, files, cwd, source } = data
  async.waterfall(
    [
      callback => {
        async.map(
          files,
          function (file, callback) {
            const [filePath, { data, content }] = file
            const { template: userSetTemplate } = data
            if (!data.title) throw new Error(`title is missing in ${filePath}`)
            // FIXME
            // ensure some fields are present in data
            callback(null, {
              ...data,
              filePath,
              author: computeAuthor(siteConfig, data),
              datePublished: computeDatePublished(data),
              dateModified: computeDateModified(data),
              description: computeDescription(data, content),
              permalink: computePermalink(
                siteConfig,
                data,
                path.relative(path.join(cwd, source), filePath)
              ),
              template: computeTemplate(
                siteConfig.themeManifest,
                userSetTemplate,
                source,
                filePath
              ),
              css: computeCss(
                siteConfig.themeManifest,
                userSetTemplate,
                source,
                filePath
              ), //  template's css file
              content: computeToc(siteConfig, data)
                ? md.render(`{:toc}\n${content}`)
                : md.render(content)
            })
          },
          callback
        )
      },

      findSiblings,
      findRelated
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
