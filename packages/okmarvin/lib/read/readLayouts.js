const requireResolve = require('../helpers/requireResolve')
const path = require('path')
const fs = require('fs')
const async = require('neo-async')
const { getHashDigest } = require('loader-utils')
module.exports = (conn, callback) => {
  const { root } = conn
  const {
    siteConfig: { layoutHierarchy }
  } = conn
  // all available layouts
  const findMe = [
    ...new Set(
      Object.values(layoutHierarchy).reduce(function (flat, toFlatten) {
        return flat.concat(toFlatten)
      }, [])
    )
  ]
  const layoutPath = path.join(__dirname, '..', 'layout')
  async.parallel(
    {
      layouts: callback => {
        const layouts = {}
        async.each(
          findMe,
          (file, callback) => {
            // first resolve root/layout
            try {
              const layout = requireResolve(file, {
                paths: [path.join(root, 'layout'), layoutPath] // user could customize their layout
              })
              layouts[file] = require(layout)
              callback()
            } catch (_err) {
              // do nothing
              callback()
            }
          },
          err => {
            if (err) return callback(err)
            callback(null, layouts)
          }
        )
      },
      layoutHash: callback => {
        let layoutHash = []
        async.each(
          findMe,
          (file, callback) => {
            try {
              const layout = requireResolve(file, {
                paths: [path.join(root, 'layout'), layoutPath]
              })
              fs.readFile(layout, (err, data) => {
                if (err) return callback(err)
                layoutHash = layoutHash.concat([getHashDigest(data)])
                callback()
              })
            } catch (err) {
              callback()
            }
          },
          err => {
            if (err) return callback(err)
            callback(null, layoutHash.sort())
          }
        )
      }
    },
    (err, results) => {
      if (err) return callback(err)
      callback(null, { ...conn, ...results })
    }
  )
}
