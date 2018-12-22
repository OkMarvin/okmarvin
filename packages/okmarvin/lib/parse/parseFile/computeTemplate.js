const path = require('path')
module.exports = function (manifest, userSetTemplate, source, filePath) {
  let template
  if (userSetTemplate) {
    template = userSetTemplate
  } else {
    // compute from path
    let paths = filePath.split(path.sep)
    template = paths[paths.indexOf(source) + 1] + '.js'
  }
  // check if theme provide it
  if (manifest[template]) {
    return template
  } else {
    throw new Error(`${template} template does not exist`)
  }
}
