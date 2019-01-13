const fs = require('fs-extra')
const async = require('neo-async')
const path = require('path')
module.exports = function (conn, callback) {
  const { themeManifest, siteConfig } = conn
  const { theme } = siteConfig
  const loadCss = Object.create(null)
  const css = Object.keys(themeManifest).filter(key => key.endsWith('.css'))
  for (let i = 0, len = css.length; i < len; i++) {
    loadCss[css[i]] = callback =>
      fs.readFile(
        path.join(
          require.resolve(theme, { paths: [conn.root] }),
          '..',
          themeManifest[css[i]]
        ),
        'utf8',
        callback
      )
  }
  async.parallel(loadCss, (err, css) => {
    if (err) return callback(err)
    callback(null, { ...conn, css })
  })
}
