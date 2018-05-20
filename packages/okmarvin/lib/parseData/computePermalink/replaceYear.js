const computeDatePublished = require('../computeDatePublished')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:year/g,
    new Date(computeDatePublished(data)).getFullYear()
  )
}
