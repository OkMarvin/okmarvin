'use strict'

const Prism = require('prismjs')

module.exports = function ({ markdown = {} } = {}) {
  const loadLanguages = require('prismjs/components/index')
  loadLanguages(markdown.loadLanguages || [])
  const md = require('markdown-it')({
    html: true,
    linkify: false,
    typography: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && Prism.languages[lang]) {
        try {
          return (
            `<pre class="language-${lang}"><code class="language-${lang}">` +
            Prism.highlight(str, Prism.languages[lang]) +
            '</code></pre>'
          )
        } catch (__) {}
      }

      return (
        `<pre class="language-${lang}"><code class="language-${lang}">` +
        md.utils.escapeHtml(str) +
        '</code></pre>'
      )
    }
  })
    .use(
      require('@okmarvin/markdown-it-toc'),
      Object.assign(
        {},
        {
          hMax: 3,
          headingAnchorPrefix: ''
        },
        markdown.toc || Object.create(null)
      )
    )
    .use(require('markdown-it-linkify-images'))
  if (markdown.use) {
    markdown.use(md)
  }
  return md
}
