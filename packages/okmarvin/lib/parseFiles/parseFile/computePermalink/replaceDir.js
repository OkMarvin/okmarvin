const path = require('path')
const slug = require('@okmarvin/slug')
module.exports = function (permalink, dir = '') {
  return permalink.replace(
    /:dir/g,
    dir
      .split(path.sep)
      .slice(1)
      .map(d => encodeURIComponent(slug(d)))
      .join('/')
  )
}
