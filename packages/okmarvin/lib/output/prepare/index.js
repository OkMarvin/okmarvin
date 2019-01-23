const async = require('neo-async')
const loadCss = require('./loadCss')
const loadLayouts = require('./loadLayouts')
const loadClientJsPath = require('./loadClientJsPath')
module.exports = function (conn, callback) {
  async.parallel(
    {
      css: callback => loadCss(conn, callback),
      clientJsPath: callback => loadClientJsPath(conn, callback),
      layoutsWithTheirHash: callback => loadLayouts(conn, callback)
    },
    (err, { css, clientJsPath, layoutsWithTheirHash: { layouts, layoutHash } }) => {
      if (err) return callback(err)
      callback(null, { ...conn, css, clientJsPath, layoutHash, layouts })
    }
  )
}
