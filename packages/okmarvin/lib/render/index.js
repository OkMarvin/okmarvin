const ReactDOMServer = require('react-dom/server')
const React = require('react')
const async = require('neo-async')
const path = require('path')
const fs = require('fs')
const generateHtml = require('./generateHtml')
const { HelmetProvider } = require('react-helmet-async')
module.exports = function (data, callback) {
  const { files, siteConfig } = data
  const { theme } = siteConfig
  const themeRoot = path.join(require.resolve(theme), '..')
  async.map(
    files,
    function (file, callback) {
      async.waterfall(
        [
          callback => {
            if (file.css) {
              fs.readFile(path.join(themeRoot, file.css), 'utf8', callback)
            } else {
              callback(null, '')
            }
          },
          (styles, callback) => {
            const Component = require(path.join(themeRoot, file.template))
              .default
            // TODO need to read component css
            const helmetContext = {}
            const rendered = ReactDOMServer.renderToStaticMarkup(
              React.createElement(
                HelmetProvider,
                { context: helmetContext },
                React.createElement(Component, { ...file, siteConfig })
              )
            )
            const { helmet } = helmetContext
            const html = generateHtml(helmet, styles, rendered)
            callback(null, { ...file, html })
          }
        ],
        callback
      )
    },
    function (err, files) {
      if (err) return callback(err)
      callback(null, {
        ...data,
        files
      })
    }
  )
}
