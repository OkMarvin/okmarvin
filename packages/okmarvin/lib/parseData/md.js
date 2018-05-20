'use strict'
const Prism = require('prismjs')
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
}).use(require('markdown-it-toc-x3'), {
  hMax: 3,
  headingAnchorPrefix: ''
})
module.exports = md
