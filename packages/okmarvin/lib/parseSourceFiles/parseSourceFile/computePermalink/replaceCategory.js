const slug = require('@okmarvin/slug')
module.exports = function(permalink, categories = []) {
  return permalink.replace(
    /:categories/g,
    categories
      .sort()
      .map(c => encodeURIComponent(slug(c)))
      .join('/')
  )
}
