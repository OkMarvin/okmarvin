const path = require('path')
module.exports = function (url) {
  return path.join(url, 'index.html').replace(/index\.html$/, '')
}
