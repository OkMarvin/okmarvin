const async = require('neo-async')
const computePermalink = require('./computePermalink')
const computeTemplate = require('./computeTemplate')
const computeCss = require('./computeCss')
const md = require('./md')
const findSiblings = require('./findSiblings')
const findRelated = require('./findRelated')
const path = require('path')
const logger = require('@okmarvin/logger')
function getTime (dateStr) {
  return new Date(dateStr).getTime()
}
module.exports = function (conn, callback) {
  logger.profile('parse')
  const { root, from, builtAt, config, siteConfig, files } = conn
  const MD = md(config)
  async.waterfall(
    [
      callback => {
        async.map(
          files,
          function (file, callback) {
            const [filePath, { data, content, excerpt }] = file

            const {
              title,
              author,
              description,
              categories,
              template: userSetTemplate,
              date: dateStr,
              dateModified: dateModifiedStr,
              toc,
              permalink: filePermalink
            } = data

            const datePublished = dateStr ? getTime(dateStr) : builtAt
            const dateModified = dateModifiedStr
              ? getTime(dateModifiedStr)
              : datePublished

            const { permalink: defaultPermalink, themeManifest } = siteConfig

            let permalink = filePermalink || defaultPermalink

            const res = {
              ...data,
              filePath,
              author: author || siteConfig.author,
              description:
                description ||
                excerpt ||
                content
                  .split(/(?!$)/u)
                  .slice(0, 230)
                  .join(''),
              datePublished,
              dateModified,
              permalink: computePermalink(
                permalink,
                {
                  title,
                  categories
                },
                new Date(datePublished),
                path.relative(path.join(root, from), filePath)
              ),
              template: computeTemplate(
                themeManifest,
                userSetTemplate,
                from,
                filePath
              ),
              css: computeCss(themeManifest, userSetTemplate, from, filePath), //  template's css file
              content: (typeof toc !== 'undefined'
                ? toc
                : siteConfig.toc)
                ? MD.render(`{:toc}\n${content}`)
                : MD.render(content)
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
        files
      })
    }
  )
}
