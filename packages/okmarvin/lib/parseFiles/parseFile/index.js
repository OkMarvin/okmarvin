const getTimeFromDateStr = require('../getTimeFromDateStr')
const computePermalink = require('./computePermalink')
const getFallbackTemplate = require('./getFallbackTemplate')

module.exports = function (
  {
    builtAt,
    themeManifest,
    siteConfig: {
      permalink: defaultPermalink,
      author: defaultAuthor,
      toc: defaultToc
    },
    devHook
  },
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

  const datePublished = dateStr ? getTimeFromDateStr(dateStr) : builtAt
  const dateModified = dateModifiedStr
    ? getTimeFromDateStr(dateModifiedStr)
    : datePublished

  const permalink = computePermalink(
    filePermalink || defaultPermalink,
    {
      title,
      categories
    },
    new Date(datePublished),
    filePath
  )
  const fallbackTemplate = getFallbackTemplate(filePath)
  const template = userSetTemplate || fallbackTemplate

  if (!themeManifest[template]) {
    // we should warn user
    if (!devHook) {
      console.warn(`${template} template does not exist`)
    }
  }

  callback(null, {
    ...file,
    author: author || defaultAuthor,
    description: description || excerpt,
    datePublished,
    dateModified,
    permalink,
    template,
    content: (typeof toc !== 'undefined'
      ? toc
      : defaultToc)
      ? `{:toc}\n${file.content}`
      : file.content
  })
}
