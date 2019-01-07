'use strict'
const async = require('neo-async')
const path = require('path')
const fs = require('fs-extra')
const { performance } = require('perf_hooks')
const logger = require('@parcel/logger')

const requireResolve = require('../../helpers/requireResolve')
const prettyTime = require('../../helpers/prettyTime')
const react = require('./ssr/react')
module.exports = function (conn, callback) {
  const begin = performance.now()
  const { files, siteConfig } = conn
  const { theme, themeManifest, clientJsManifest, layouts } = siteConfig
  const { root } = conn
  const themeRoot = path.join(requireResolve(theme, { paths: [root] }), '..')
  async.waterfall(
    [
      callback => {
        if (clientJsManifest['client.js']) {
          callback(null, `/static/js/${clientJsManifest['client.js']}`)
        } else {
          callback(null, '')
        }
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
                  const useLayout = layouts.get(file.layout)
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
      logger.success(
        `Rendered ${files.length} files in ${prettyTime(performance.now() - begin)}`
      )
      callback(null, {
        ...conn,
        files
      })
    }
  )
}
