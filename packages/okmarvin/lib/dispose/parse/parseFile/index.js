const getTimeFromDateStr = require('../getTimeFromDateStr')
const computePermalink = require('./computePermalink')
const getFallbackTemplate = require('./getFallbackTemplate')
const logger = require('@parcel/logger')
// TODO some can be lazy parsed for better performance??
module.exports = function (conn, file, callback) {
  const {
    builtAt,
    cache: { builtAt: lastBuiltAt, themeManifest: lastThemeManifest },
    clean,
    themeManifest,
    siteConfig: {
      permalink: defaultPermalink,
      author: defaultAuthor,
      toc: defaultToc
    }
  } = conn
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
    permalink: filePermalink,
    stats: { ctimeMs }
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
    if (!conn.devHook) {
      logger.warn(`${template} template does not exist`)
    }
  }
  const templateChanged =
    themeManifest[template] !== lastThemeManifest[template]
  const cssChanged =
    themeManifest[template.replace('.js', '.css')] !==
    lastThemeManifest[template.replace('.js', '.css')]
  const markdownFileChanged =
    typeof lastBuiltAt === 'undefined' ? true : ctimeMs > lastBuiltAt

  const isFileDirtyNow =
    clean === true ? true : markdownFileChanged || cssChanged || templateChanged

  // TODO just pass raw file down if it's dirty
  callback(null, {
    ...file,
    author: author || defaultAuthor,
    description: description || excerpt,
    datePublished,
    dateModified,
    permalink,
    template,
    dirty: isFileDirtyNow,
    content: (typeof toc !== 'undefined'
      ? toc
      : defaultToc)
      ? `{:toc}\n${file.content}`
      : file.content
  })
}
