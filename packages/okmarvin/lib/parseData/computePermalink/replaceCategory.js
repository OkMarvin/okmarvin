const slug = require('@okmarvin/slug')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:categories/g,
    (data.categories || []).map(c => encodeURIComponent(slug(c))).join('/')
  )
}
