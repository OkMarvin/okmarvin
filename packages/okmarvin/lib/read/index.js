const path = require('path')
const fs = require('fs-extra')
const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')
const requireResolve = require('../helpers/requireResolve')

const readOkmarvinConfig = require('./readOkmarvinConfig')
const readSiteConfig = require('./readSiteConfig')
const readFiles = require('./readFiles')
const readCache = require('./readCache')

/**
 * Prepare data here for okmarvin
 */
module.exports = async function (conn, callback) {
  const begin = Date.now()
  const { root, from } = conn
  const fromPath = path.join(root, from)

  if (!fs.existsSync(fromPath)) {
    // user should fix it
    return logger.warn(
      `Oops, nothing to do because "${from}" directory does not exist.`
    )
  }
  async.waterfall(
    [
      callback =>
        async.parallel(
          {
            cache: callback => readCache(root, callback),
            okmarvinConfig: callback => readOkmarvinConfig(root, callback),
            siteConfig: callback => readSiteConfig(root, callback),
            files: callback => readFiles(fromPath, callback)
          },
          callback
        ),
      (results, callback) => {
        const {
          siteConfig: { layoutHierarchy }
        } = results
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
        callback(null, { ...results, layouts })
      }
    ],
    (err, results) => {
      if (err) return callback(err)
      logger.success(`Read in ${prettyTime(Date.now() - begin)}`)
      callback(null, { ...conn, ...results })
    }
  )
}
