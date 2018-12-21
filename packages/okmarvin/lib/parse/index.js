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
const logger = require('@okmarvin/logger')
module.exports = function (conn, callback) {
  logger.profile('parse')
  const { root, from, builtAt, config: mdConfig, siteConfig, files } = conn
  const MD = md(mdConfig)
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
            const author = computeAuthor(siteConfig, fileData)
            const datePublished = computeDatePublished(date, builtAt)
            const dateModified = computeDateModified(fileData)
            const description = computeDescription(fileData, content)
            const perma = computePermalink(
              permalink,
              fileData,
              new Date(computeDatePublished(date, builtAt)),
              path.relative(path.join(root, from), filePath)
            )
            const templ = computeTemplate(
              themeManifest,
              userSetTemplate,
              from,
              filePath
            )
            const css = computeCss(
              themeManifest,
              userSetTemplate,
              from,
              filePath
            )

            const cont = computeToc(siteConfig, fileData)
              ? MD.render(`{:toc}\n${content}`)
              : MD.render(content)
            const res = {
              ...fileData,
              filePath,
              author,
              datePublished,
              dateModified,
              description,
              permalink: perma,
              template: templ,
              css, //  template's css file
              content: cont
            }
            callback(null, res)
          },
          function (err, files) {
            if (err) return callback(err)
            return callback(null, files)
          }
        )
      },

      findSiblings,
      findRelated
    ],
    (err, files) => {
      logger.profile('parse')
      if (err) return callback(err)
      callback(null, {
        ...conn,
        siteConfig,
        files
      })
    }
  )
}
