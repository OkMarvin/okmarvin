const computeDatePublished = require('../computeDatePublished')
module.exports = function (permalink, data) {
  return permalink.replace(
    /:day/g,
    new Date(computeDatePublished(data)).getDate()
  )
}
