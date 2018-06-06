const ReactDOMServer = require('react-dom/server')
const React = require('react')
const async = require('neo-async')
const path = require('path')
const { HelmetProvider } = require('react-helmet-async')
module.exports = function (data, callback) {
  const { files, siteConfig } = data
  const { theme } = siteConfig
  async.map(
    files,
    function (file, callback) {
      const Component = require(path.join(
        require.resolve(theme),
        '..',
        file.template
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
      const html = `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="___OkMarvin___">${rendered}</div>
  </body>
</html>`
      callback(null, { ...file, html })
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
