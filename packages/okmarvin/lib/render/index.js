const async = require('neo-async')
const path = require('path')
const fs = require('fs-extra')
const requireResolve = require('../helpers/requireResolve')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')
const react = require('./ssr/react')
module.exports = function (conn, callback) {
  const begin = Date.now()
  const { files, siteConfig, layouts } = conn
  const { theme, themeManifest, layoutHierarchy } = siteConfig
  const { root } = conn
  const themeRoot = path.join(requireResolve(theme, { paths: [root] }), '..')
  async.waterfall(
    [
      callback => {
        const clientManifestPath = path.join(
          themeRoot,
          '/static/js/manifest.json'
        )
        fs.pathExists(clientManifestPath, (err, exists) => {
          if (err) return callback(null, '')
          if (!exists) return callback(null, '')
          const clientManifest = require(clientManifestPath)
          return callback(
            null,
            clientManifest['client.js']
              ? `/static/js/${clientManifest['client.js']}`
              : ''
          )
        })
      },
      (clientJS, callback) => {
        async.map(
          files,
          function (file, callback) {
            if (path.extname(file.permalink) === '.xml') {
              // no need to compiled
              return callback(null, file)
            }
            async.waterfall(
              [
                callback => {
                  if (file.css) {
                    fs.readFile(
                      path.join(themeRoot, themeManifest[file.css]),
                      'utf8',
                      callback
                    )
                  } else {
                    callback(null, '')
                  }
                },
                (styles, callback) => {
                  const Component = require(path.join(
                    themeRoot,
                    themeManifest[file.template]
                  )).default
                  /**
                   * right now we only support React ssr
                   * but vue, preact, etc. can be supported too
                   */
                  const rendered = react(Component, { file, siteConfig })
                  // find the first could be use
                  const candidateLayouts =
                    layoutHierarchy[file.layout || file.template]
                  let useLayout
                  for (let i in candidateLayouts) {
                    if (
                      Object.keys(layouts).indexOf(candidateLayouts[i]) !== -1
                    ) {
                      useLayout = layouts[candidateLayouts[i]]
                      break
                    }
                  }
                  const html = useLayout(
                    file,
                    siteConfig,
                    styles,
                    rendered,
                    clientJS
                  )
                  callback(null, { ...file, html })
                }
              ],
              callback
            )
          },
          callback
        )
      }
    ],
    function (err, files) {
      if (err) return callback(err)
      logger.success(`Rendered in ${prettyTime(Date.now() - begin)}`)
      callback(null, {
        ...conn,
        files
      })
    }
  )
}
