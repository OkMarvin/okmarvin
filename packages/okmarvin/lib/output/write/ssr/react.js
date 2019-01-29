const ReactDOMServer = require('react-dom/server')
const React = require('react')
module.exports = function (Component, { file, site }) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Component, { ...file, site })
  )
}
