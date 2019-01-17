const slug = require('@okmarvin/slug')
module.exports = function (permalink, title = '') {
  return permalink.replace(
    /:title/g,
    encodeURIComponent(slug(title))
  )
}
