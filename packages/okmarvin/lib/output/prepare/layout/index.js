function loadFavicon (icon) {
  if (icon.endsWith('.ico')) {
    return `<link rel="shortcut icon" href="${icon}" />`
  }
  if (icon.endsWith('.gif')) {
    return `<link rel="icon" type="image/gif" href="${icon} />`
  }
  if (icon.endsWith('.png')) {
    return `<link rel="icon" type="image/png" href="${icon} />`
  }
}

function loadGoogleAnalytics (id) {
  return `<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
  
    gtag("config", "${id}");
  </script>`
}

module.exports = function ({
  file: { title, description, permalink, datePublished, dateModified, author },
  siteConfig: {
    lang,
    url,
    logo,
    google_analytics: googleAnalytics,
    favicon,
    themeColor
  },
  styles,
  content,
  clientJsPath: clientJs,
  helpers: { escapeHtml }
}) {
  return `
  <!doctype html>
  <html lang="${lang}">
    <head>
      <title>${escapeHtml(title)}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="generator" content="okmarvin" />
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content="website" />

      <meta name="description" content="${escapeHtml(description)}" />
      <meta property="og:title" content="${escapeHtml(title)}" />
      <meta property="og:description" content="${escapeHtml(description)}" />
      <meta property="og:url" content="${url + permalink}" />
      <link rel="canonical" href="${url + permalink}" />

      ${favicon ? loadFavicon(favicon) : ''}
      ${themeColor ? `<meta name="theme-color" content="${themeColor}" />` : ''}
      <style type="text/css">${styles}</style>
      ${clientJs ? `<link rel="preload" href="${clientJs}" as="script" />` : ''}
      ${logo ? `<link rel="preload" href="${logo}" as="image" />` : ''}
    </head>
    <body>
      <div id="___OkMarvin___">${content}</div>
      ${clientJs ? `<script src="${clientJs}"></script>` : ''}
      ${googleAnalytics ? loadGoogleAnalytics(googleAnalytics) : ''}
    </body>
  </html>`
}
