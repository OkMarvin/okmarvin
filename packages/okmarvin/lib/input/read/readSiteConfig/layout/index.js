const preload = require('./common/preload')
const loadFavicon = require('./common/loadFavicon')
const loadStaticMeta = require('./common/loadStaticMeta')
const loadCommon = require('./common/loadCommon')
const loadGoogleAnalytics = require('./common/loadGoogleAnalytics')
module.exports = function (
  { title, description, permalink, datePublished, dateModified, author },
  { lang, url, logo, google_analytics: googleAnalytics, favicon, themeColor },
  styles,
  rendered,
  clientJS
) {
  return `<!doctype html>
  <html lang="${lang}">
    <head>
      <title>${title}</title>
      ${favicon ? loadFavicon(favicon) : ''}
      ${loadStaticMeta()}
      ${loadCommon({ description, title, permalink }, { url, logo })}
      ${themeColor ? `<meta name="theme-color" content="${themeColor}" />` : ''}
      <meta property="og:type" content="website" />
      <style type="text/css">${styles}</style>
      ${clientJS ? preload('script', clientJS) : ''}
      ${logo ? preload('image', logo) : ''}
    </head>
    <body>
      <div id="___OkMarvin___">${rendered}</div>
      ${clientJS ? `<script src="${clientJS}"></script>` : ''}
      ${googleAnalytics ? loadGoogleAnalytics(googleAnalytics) : ''}
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
