const slug = require('@okmarvin/slug')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:title/g,
    encodeURIComponent(slug(data.title))
  )
}
