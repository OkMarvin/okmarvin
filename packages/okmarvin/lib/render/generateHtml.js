module.exports = function (helmet, styles, rendered) {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${`<style type='text/css'>${styles}</style>`}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="___OkMarvin___">${rendered}</div>
    ${helmet.script.toString()}
  </body>
</html>`
}
