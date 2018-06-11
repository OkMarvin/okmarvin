const slug = require('../../helpers/slug')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:title/g,
    encodeURIComponent(slug(data.title))
  )
}
