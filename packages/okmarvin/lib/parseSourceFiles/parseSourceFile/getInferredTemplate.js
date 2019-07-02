/**
 * Say file exists under post/hello.md
 * then we should set template to `post.js`
 */
module.exports = function (filePath) {
  return filePath.split('/')[0].slice(1, -1) + '.js'
}
