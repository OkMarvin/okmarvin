const requireResolve = require('../../helpers/requireResolve')
const path = require('path')
const fs = require('fs')
const async = require('neo-async')
const { getHashDigest } = require('loader-utils')
module.exports = (conn, callback) => {
  const { root, site } = conn
  const { layoutHierarchy = {} } = site
  // all available layouts
  const defaultLayoutList = [
    ...new Set(
      Object.values(layoutHierarchy).reduce(function (flat, toFlatten) {
        return flat.concat(toFlatten)
      }, [])
    )
  ]
  const defaultLayoutPath = path.join(__dirname, '_layouts')
  const customizedLayoutPath = path.join(root, '_layouts')
  const layoutPaths = [customizedLayoutPath, defaultLayoutPath]
  // collect all available layouts
  let availableLayoutList = []
  for (let i = 0, len = defaultLayoutList.length; i < len; i++) {
    const layoutName = defaultLayoutList[i]
    try {
      const layoutPath = requireResolve(layoutName, {
        paths: layoutPaths
      })
      availableLayoutList = availableLayoutList.concat([
        [layoutName, layoutPath]
      ])
    } catch (_err) {
      // layout does not exist
    }
  }
  async.parallel(
    {
      layouts: callback => {
        // for render
        const layouts = Object.create(null)
        for (let i = 0, len = availableLayoutList.length; i < len; i++) {
          const [layoutName, layoutPath] = availableLayoutList[i]
          layouts[layoutName] = require(layoutPath)
        }
        callback(null, layouts)
      },
      layoutHash: callback => {
        // for incremental rebuild
        async.map(
          availableLayoutList,
          ([_, layoutPath], callback) => {
            fs.readFile(layoutPath, (err, data) => {
              if (err) return callback(err)
              callback(null, getHashDigest(data))
            })
          },
          callback
        )
      }
    },
    (err, { layouts, layoutHash }) => {
      if (err) return callback(err)
      callback(null, { layouts, layoutHash: layoutHash.sort() })
    }
  )
}
