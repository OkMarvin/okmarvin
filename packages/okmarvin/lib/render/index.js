const ReactDOMServer = require('react-dom/server')
const React = require('react')
const async = require('neo-async')
module.exports = function (data, callback) {
  const { files } = data
  async.map(
    files,
    function (file, callback) {
      const Component = require(file.template).default
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
