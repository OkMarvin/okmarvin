const async = require('neo-async')
/**
 * Compute layout for all files
 */
module.exports = function (conn, callback) {
  const {
    files,
    layouts,
    siteConfig: { layoutHierarchy }
  } = conn
  async.map(
    files,
    (file, callback) => {
      const { layout, template } = file
      const candidateLayouts = layoutHierarchy[layout || template]
      let useLayout
      for (let i in candidateLayouts) {
        if (Object.keys(layouts).indexOf(candidateLayouts[i]) !== -1) {
          useLayout = candidateLayouts[i]
          break
        }
      }
      callback(null, { ...file, layout: useLayout })
    },
    (err, files) => {
      if (err) return callback(err)
      callback(null, { ...conn, files })
    }
  )
}
