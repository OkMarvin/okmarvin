const fs = require('fs-extra')
const path = require('path')
module.exports = function (dir) {
  const cwd = process.cwd()
  fs.copy(
    path.join(__dirname, '..', 'okmarvin-starter'),
    path.join(cwd, dir)
  )
}
