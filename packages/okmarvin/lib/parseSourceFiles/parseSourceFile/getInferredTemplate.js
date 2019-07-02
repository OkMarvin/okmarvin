'use strict'
/**
 * Say file exists under post/hello.md
 * then we should set template to `post.js`
 */
const { sep } = require('path')
module.exports = function(filePath) {
  return filePath.split(sep)[0].slice(1, -1) + '.js'
}
