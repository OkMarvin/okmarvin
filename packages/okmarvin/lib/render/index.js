const ReactDOMServer = require('react-dom/server')
const React = require('react')
const async = require('neo-async')
const path = require('path')
const fs = require('fs-extra')
const generateHtml = require('./generateHtml')
const { HelmetProvider } = require('react-helmet-async')
module.exports = function (data, callback) {
  const { files, siteConfig } = data
  const { theme, themeManifest } = siteConfig
  const themeRoot = path.join(require.resolve(theme), '..')
  async.waterfall(
    [
      callback => {
        const clientManifestPath = path.join(
          themeRoot,
          '/static/js/manifest.json'
        )
        fs.pathExists(clientManifestPath, (err, exists) => {
          if (err) return callback(null, '')
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
                  const helmetContext = {}
                  const rendered = ReactDOMServer.renderToStaticMarkup(
                    React.createElement(
                      HelmetProvider,
                      { context: helmetContext },
                      React.createElement(Component, { ...file, siteConfig })
                    )
                  )
                  const { helmet } = helmetContext
                  const html = generateHtml(helmet, styles, rendered, clientJS)
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
      callback(null, {
        ...data,
        files
      })
    }
  )
}
