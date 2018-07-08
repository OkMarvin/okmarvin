const fs = require('fs-extra')
const path = require('path')
module.exports = function (target) {
  fs.copy(
    path.join(__dirname, '..', 'okmarvin-starter'), target, err => {
      if (err) throw err
    }
  )
}
