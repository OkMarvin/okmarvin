const path = require('path')
module.exports = function (permalink, dir = '') {
  return permalink.replace(
    /:dir/g,
    dir
      .split(path.sep)
      .slice(2)
      .join(path.sep)
  )
}
