const fs = require('fs-extra')
const async = require('neo-async')
const path = require('path')
/**
 * Inline all css files defined in theme manifest
 */
module.exports = function (conn, callback) {
  const { themeManifest, site } = conn
  const { theme } = site
  const inlinedCss = Object.create(null)
  const css = Object.keys(themeManifest).filter(key => key.endsWith('.css'))
  for (let i = 0, len = css.length; i < len; i++) {
    inlinedCss[css[i]] = callback =>
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
  async.parallel(inlinedCss, (err, css) => {
    if (err) return callback(err)
    callback(null, css)
  })
}
