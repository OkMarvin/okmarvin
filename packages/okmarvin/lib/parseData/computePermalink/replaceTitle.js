const slugger = require('slugger')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:title/g,
    encodeURIComponent(slugger(data.title))
  )
}
