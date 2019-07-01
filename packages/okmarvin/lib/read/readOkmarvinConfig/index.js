'use strict'
const path = require('path')
module.exports = function readOkmarvinConfig({ root }, callback) {
  try {
    callback(null, require(path.join(root, '.okmarvin.js')))
  } catch (_e) {
    // default value for okmarvin config
    return callback(null, {
      markdown: {
        toc: {},
        loadLanguages: []
      }
    })
  }
}
