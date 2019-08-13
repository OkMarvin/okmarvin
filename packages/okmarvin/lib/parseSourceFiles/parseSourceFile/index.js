const getTimeFromDateStr = require('../getTimeFromDateStr')
const computePermalink = require('./computePermalink')
const getInferredTemplate = require('./getInferredTemplate')
const logger = require('@parcel/logger')
const getToc = require('./getToc')
const md = require('@okmarvin/markdown')
module.exports = function(
  { builtAt, themeManifest, site, okmarvinConfig },
  file,
  callback
) {
  const {
    filePath,
    excerpt,
    title,
    author,
    description,
    toc,
    categories,
    template: userSetTemplate,
    date: dateStr,
    dateModified: dateModifiedStr,
    permalink: filePermalink
  } = file
  const MD = md(okmarvinConfig)

  const datePublished = dateStr ? getTimeFromDateStr(dateStr) : builtAt
  const dateModified = dateModifiedStr
    ? getTimeFromDateStr(dateModifiedStr)
    : datePublished

  const permalink = computePermalink(filePermalink || site.permalink, {
    title,
    categories,
    datePublished: new Date(datePublished),
    filePath
  })
  const inferredTemplate = getInferredTemplate(filePath)
  const template = userSetTemplate || inferredTemplate

  if (!themeManifest[template]) {
    // we should warn user
    logger.warn(
      `${filePath} won't be rendered since '${template}' template does not exist`
    )
  }

  callback(null, {
    ...file,
    author: author || site.author, // defaults to site.author if non author presented in markdown file
    description: description || excerpt,
    datePublished,
    dateModified,
    permalink,
    template,
    content: MD.render(
      getToc(toc, site.toc) ? `{:toc}\n${file.content}` : file.content
    )
  })
}
