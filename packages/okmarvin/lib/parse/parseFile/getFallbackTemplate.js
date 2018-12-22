/**
 * Say file exists under content/post/hello.md
 * and hello.md do not have `template` field
 * then we should set template to `post.js`
 */
const path = require('path')
module.exports = function (root, source, filePath) {
  return (
    path.relative(path.join(root, source), filePath).split(path.sep)[0] + '.js'
  )
}
