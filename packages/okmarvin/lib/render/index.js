const ReactDOMServer = require('react-dom/server')
const React = require('react')
const async = require('neo-async')
const path = require('path')
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
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Component, {})
      )
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
