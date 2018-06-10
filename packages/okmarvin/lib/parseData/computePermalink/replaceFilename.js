module.exports = function (permalink, filename) {
  return permalink.replace(
    /:filename/g,
    filename === 'index' ? '' : filename
  )
}
