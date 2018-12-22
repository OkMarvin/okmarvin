const path = require('path')
const getTimeFromDateStr = require('../getTimeFromDateStr')
const md = require('./md')
const computePermalink = require('./computePermalink')
const computeTemplate = require('./computeTemplate')
const computeCss = require('./computeCss')

module.exports = function (conn, file, callback) {
  const {
    root,
    from,
    builtAt,
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
    permalink: filePermalink
  } = file

  const datePublished = dateStr ? getTimeFromDateStr(dateStr) : builtAt
  const dateModified = dateModifiedStr
    ? getTimeFromDateStr(dateModifiedStr)
    : datePublished

  const permalink = filePermalink || defaultPermalink

  const res = {
    ...file,
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
    permalink: computePermalink(
      permalink,
      {
        title,
        categories
      },
      new Date(datePublished),
      path.relative(path.join(root, from), filePath)
    ),
    template: computeTemplate(themeManifest, userSetTemplate, from, filePath),
    css: computeCss(themeManifest, userSetTemplate, from, filePath), //  template's css file
    content: (typeof fileToc !== 'undefined'
      ? fileToc
      : siteToc)
      ? MD.render(`{:toc}\n${content}`)
      : MD.render(content)
  }
  callback(null, res)
}
