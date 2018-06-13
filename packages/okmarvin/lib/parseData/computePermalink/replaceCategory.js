const slug = require('@okmarvin/slug')
module.exports = function (permalink, categories = []) {
  return permalink.replace(
    /:categories/g,
    categories.map(c => encodeURIComponent(slug(c))).join('/')
  )
}
