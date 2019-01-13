const async = require('neo-async')
module.exports = (conn, callback) => {
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
      for (let i = 0, len = candidateLayouts.length; i < len; i++) {
        if (layouts[candidateLayouts[i]]) {
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
