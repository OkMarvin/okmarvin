const async = require('neo-async')
const inlineCss = require('./inlineCss')
const loadLayouts = require('./loadLayouts')
const loadClientJsPath = require('./loadClientJsPath')
module.exports = function(conn, callback) {
  async.parallel(
    {
      css: callback => inlineCss(conn, callback),
      clientJsPath: callback => loadClientJsPath(conn, callback),
      layouts: callback => loadLayouts(conn, callback)
    },
    (err, { css, clientJsPath, layouts }) => {
      if (err) return callback(err)
      callback(null, { ...conn, css, clientJsPath, layouts })
    }
  )
}
