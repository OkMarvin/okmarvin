const async = require('neo-async')
module.exports = (conn, callback) => {
  const {
    files,
    siteConfig: { layoutHierarchy, layouts }
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
      callback(null, files)
    }
  )
}
