const genScript = require('./genScript')
const preloadScript = require('./preloadScript')
module.exports = function (helmet, styles, rendered, clientJS) {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${`<style type='text/css'>${styles}</style>`}
    ${clientJS && preloadScript(clientJS)}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="___OkMarvin___">${rendered}</div>
    ${helmet.script.toString()}
    ${clientJS && genScript(clientJS)}
  </body>
</html>`
}
