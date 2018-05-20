const path = require('path')
module.exports = function (manifest, data, filePath) {
  let template
  if (data.template) {
    template = data.template
  } else {
    // compute from path
    let paths = filePath.split(path.sep)
    template = paths[paths.indexOf('content') + 1]
  }
  // check if theme provide it
  if (manifest[template + '.js']) {
    return manifest[template + '.js']
  } else {
    throw new Error(`${template} template does not exists`)
  }
}
