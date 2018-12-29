const path = require('path')
const getTimeFromDateStr = require('../getTimeFromDateStr')
const md = require('./md')
const computePermalink = require('./computePermalink')
const getFallbackTemplate = require('./getFallbackTemplate')
const escapeTextForBrowser = require('./escapeTextForBrowser')

module.exports = function (conn, file, callback) {
  const {
    root,
    from,
    builtAt,
    cache: { lastBuiltAt, lastThemeManifest },
    clean,
    okmarvinConfig,
    siteConfig: {
      permalink: defaultPermalink,
      themeManifest,
      author: siteAuthor,
      toc: siteToc
    }
  } = conn
  const MD = md(okmarvinConfig)
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
    path.relative(path.join(root, from), filePath)
  )
  const fallbackTemplate = getFallbackTemplate(root, from, filePath)
  const template = userSetTemplate || fallbackTemplate

  if (!themeManifest[template]) {
    // we should warn user
    callback(new Error(`${template} template does not exist`))
  }
  const templateChanged =
    themeManifest[template] !== lastThemeManifest[template]
  const cssChanged =
    themeManifest[template.replace('.js', '.css')] !==
    lastThemeManifest[template.replace('.js', '.css')]
  const fileChanged =
    typeof lastBuiltAt === 'undefined' ? true : ctimeMs > lastBuiltAt
  callback(null, {
    ...file,
    title: escapeTextForBrowser(title),
    author: escapeTextForBrowser(fileAuthor || siteAuthor),
    description: escapeTextForBrowser(
      description ||
        excerpt ||
        content
          .split(/(?!$)/u)
          .slice(0, 230)
          .join('')
    ),
    datePublished,
    dateModified,
    permalink,
    template,
    dirty: clean === true ? true : fileChanged || cssChanged || templateChanged,
    css: template.replace('.js', '.css'), //  template's css file
    content: (typeof fileToc !== 'undefined'
      ? fileToc
      : siteToc)
      ? MD.render(`{:toc}\n${content}`)
      : MD.render(content)
  })
}
