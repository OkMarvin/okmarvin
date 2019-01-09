module.exports = function ({ description, title, permalink }, { url }) {
  return `<meta name="description" content="${description}" />
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${url + permalink}" />
      <link rel="canonical" href="${url + permalink}" />`
}
