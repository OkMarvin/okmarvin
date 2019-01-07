const requireResolve = require('../../helpers/requireResolve')
const path = require('path')
const fs = require('fs')
const async = require('neo-async')
const { getHashDigest } = require('loader-utils')
module.exports = (root, layoutHierarchy) => {
  return new Promise((resolve, reject) => {
    // all available layouts
    const findMe = [
      ...new Set(
        Object.values(layoutHierarchy).reduce(function (flat, toFlatten) {
          return flat.concat(toFlatten)
        }, [])
      )
    ]
    const defaultLayoutPath = path.join(__dirname, 'layout')
    const customizedLayoutPath = path.join(root, 'layout')
    const layoutPaths = [customizedLayoutPath, defaultLayoutPath]
    async.parallel(
      {
        layouts: callback => {
          const layouts = {}
          findMe.forEach(file => {
            try {
              const layout = requireResolve(file, {
                paths: layoutPaths
              })
              layouts[file] = require(layout)
            } catch (_err) {
            // do nothing
            }
          })
          callback(null, layouts)
        },
        layoutHash: callback => {
          let layoutHash = []
          async.each(
            findMe,
            (file, callback) => {
              try {
                const layout = requireResolve(file, {
                  paths: layoutPaths
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
        if (err) return reject(err)
        resolve(results)
      }
    )
  })
}
