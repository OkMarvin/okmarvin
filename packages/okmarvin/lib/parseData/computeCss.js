const path = require('path')
module.exports = function (manifest, userSetTemplate, filePath) {
  let template
  if (userSetTemplate) {
    template = userSetTemplate
  } else {
    // compute from path
    let paths = filePath.split(path.sep)
    template = paths[paths.indexOf('content') + 1]
  }
  // check if theme provide it
  if (manifest[template + '.css']) {
    return template + '.css'
  } else {
    return null
  }
}
