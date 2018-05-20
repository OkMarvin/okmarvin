const computeDatePublished = require('../computeDatePublished')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:month/g,
    new Date(computeDatePublished(data)).getMonth() + 1
  )
}
