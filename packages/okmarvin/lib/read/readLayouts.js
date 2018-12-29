const requireResolve = require('../helpers/requireResolve')
const path = require('path')
module.exports = (conn, callback) => {
  const { root } = conn
  const {
    siteConfig: { layoutHierarchy }
  } = conn
  const findMe = [
    ...new Set(
      Object.values(layoutHierarchy).reduce(function (flat, toFlatten) {
        return flat.concat(toFlatten)
      }, [])
    )
  ]
  const layouts = {}
  const layoutPath = path.join(__dirname, '..', 'layout')
  findMe.forEach(file => {
    // first resolve root/layout
    try {
      const layout = requireResolve(file, {
        paths: [path.join(root, 'layout'), layoutPath]
      })
      layouts[file] = require(layout)
    } catch (_err) {
      // do nothing
    }
  })
  callback(null, { ...conn, layouts })
}
