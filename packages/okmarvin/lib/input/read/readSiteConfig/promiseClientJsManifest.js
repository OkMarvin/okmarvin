// read theme client js manifest json file
const fs = require('fs')
const path = require('path')
module.exports = function (root, theme) {
  return new Promise((resolve, reject) => {
    const themeRoot = require.resolve(theme, { paths: [root] })
    fs.readFile(path.join(themeRoot, '..', 'static/js/manifest.json'), 'utf8', (err, manifestStr) => {
      if (err) return resolve({})
      const manifest = JSON.parse(manifestStr)
      resolve(manifest)
    })
  })
}
