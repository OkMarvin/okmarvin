const genScript = require('../genScript')
const preloadScript = require('../preloadScript')
const loadFavicon = require('./common/loadFavicon')
const loadStaticMeta = require('./common/loadStaticMeta')
const loadCommon = require('./common/loadCommon')
const loadGoogleAnalytics = require('./common/loadGoogleAnalytics')
module.exports = function (
  { title, description, permalink, datePublished, dateModified, author },
  { lang, url, google_analytics: googleAnalytics, favicon },
  styles,
  rendered,
  clientJS
) {
  return `<!doctype html>
  <html lang="${lang}">
    <head>
      <title>${title}</title>
      ${favicon && loadFavicon(favicon)}
      ${loadStaticMeta()}
      ${loadCommon({ description, title, permalink }, { url })}
      <meta property="og:type" content="website" />
      <style type="text/css">${styles}</style>
      ${clientJS && preloadScript(clientJS)}
    </head>
    <body>
      <div id="___OkMarvin___">${rendered}</div>
      ${clientJS && genScript(clientJS)}
      ${googleAnalytics && loadGoogleAnalytics(googleAnalytics)}
        <script type='application/ld+json'>
        {
          "@context": "http://schema.org",
          "@type": "Blog",
          "name": "${title}",
          "description": "${description}"
        }
    </body>
  </html>`
}