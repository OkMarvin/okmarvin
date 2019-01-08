const path = require('path')
const getTimeFromDateStr = require('../getTimeFromDateStr')
const computePermalink = require('./computePermalink')
const getFallbackTemplate = require('./getFallbackTemplate')
const logger = require('@parcel/logger')
// TODO some can be lazy parsed for better performance??
module.exports = function (conn, file, callback) {
  const {
    root,
    source,
    builtAt,
    cache: { builtAt: lastBuiltAt, themeManifest: lastThemeManifest },
    clean,
    themeManifest,
    siteConfig: {
      permalink: defaultPermalink,
      author: siteAuthor,
      toc: siteToc
    }
  } = conn
  const {
    filePath,
    excerpt,
    title,
    author: fileAuthor,
    description,
    content,
    categories,
    template: userSetTemplate,
    date: dateStr,
    dateModified: dateModifiedStr,
    toc: fileToc,
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
    path.relative(path.join(root, source), filePath)
  )
  const fallbackTemplate = getFallbackTemplate(root, source, filePath)
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
    title: title,
    author: fileAuthor || siteAuthor,
    description:
      description ||
      excerpt ||
      content
        .split(/(?!$)/u)
        .slice(0, 230)
        .join(''),
    datePublished,
    dateModified,
    permalink,
    template,
    dirty: isFileDirtyNow,
    css: template.replace('.js', '.css'), //  template's css file
    content: (typeof fileToc !== 'undefined'
      ? fileToc
      : siteToc)
      ? `{:toc}\n${content}`
      : content
  })
}
