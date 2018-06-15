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
  const { siteConfig, files, cwd, source, now } = data
  async.waterfall(
    [
      callback => {
        async.map(
          files,
          function (file, callback) {
            const [filePath, { data: fileData, content }] = file
            const { template: userSetTemplate, date } = fileData
            const { permalink, themeManifest } = siteConfig
            // FIXME throw cause problem in theme devloping
            if (!fileData.title) {
              throw new Error(`title is missing in ${filePath}`)
            }
            // FIXME
            // ensure some fields are present in fileData
            callback(null, {
              ...fileData,
              filePath,
              author: computeAuthor(siteConfig, fileData),
              datePublished: computeDatePublished(date, now),
              dateModified: computeDateModified(fileData),
              description: computeDescription(fileData, content),
              permalink: computePermalink(
                permalink,
                fileData,
                new Date(computeDatePublished(date, now)),
                path.relative(path.join(cwd, source), filePath)
              ),
              template: computeTemplate(
                themeManifest,
                userSetTemplate,
                source,
                filePath
              ),
              css: computeCss(themeManifest, userSetTemplate, source, filePath), //  template's css file
              content: computeToc(siteConfig, fileData)
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
