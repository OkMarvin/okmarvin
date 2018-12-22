const slug = require('@okmarvin/slug')
module.exports = function (permalink, filename) {
  return permalink.replace(
    /:filename/g,
    filename === 'index' ? '' : encodeURIComponent(slug(filename))
  )
}
