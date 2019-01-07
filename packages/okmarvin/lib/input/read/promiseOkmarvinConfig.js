const path = require('path')
module.exports = function (root) {
  return new Promise((resolve, reject) => {
    try {
      resolve(require(path.join(root, '.okmarvin.js')))
    } catch (_e) {
      resolve(Object.create(null))
    }
  })
}
