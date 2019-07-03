const getTimeFromDateStr = require('../getTimeFromDateStr')
const computePermalink = require('./computePermalink')
const getInferredTemplate = require('./getInferredTemplate')
// const logger = require('@parcel/logger')
const getToc = require('./getToc')

module.exports = function({ builtAt, themeManifest, site }, file, callback) {
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

  // TODO warn later, after we compose all those index pages
  // if (!themeManifest[template]) {
  //   // we should warn user
  //   logger.warn(
  //     `${filePath} won't be rendered since '${template}' template does not exist`
  //   )
  // }

  callback(null, {
    ...file,
    author: author || site.author, // defaults to site.author if non author presented in markdown file
    description: description || excerpt,
    datePublished,
    dateModified,
    permalink,
    template,
    content: getToc(toc, site.toc) ? `{:toc}\n${file.content}` : file.content
  })
}
