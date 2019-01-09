const escapeHtml = require('escape-html')
module.exports = function ({ description, title, permalink }, { url }) {
  return `<meta name="description" content="${escapeHtml(description)}" />
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content="${escapeHtml(title)}" />
      <meta property="og:description" content="${escapeHtml(description)}" />
      <meta property="og:url" content="${url + permalink}" />
      <link rel="canonical" href="${url + permalink}" />`
}
