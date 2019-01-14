/**
 * Say file exists under post/hello.md
 * then we should set template to `post.js`
 */
const path = require('path')
module.exports = function (filePath) {
  return (
    filePath.split(path.sep)[0] + '.js'
  )
}
