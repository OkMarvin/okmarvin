const matter = require('gray-matter')
module.exports = function (str) {
  return matter(str)
}
