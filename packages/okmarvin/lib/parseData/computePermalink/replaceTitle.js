const slugger = require('./slugger')
module.exports = function (permalink, data) {
  slugger.reset()
  return permalink.replace(
    /:title/g,
    encodeURIComponent(slugger.slug(data.title))
  )
}
