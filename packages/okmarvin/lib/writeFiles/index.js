const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const {files, cwd} = data
  async.map(files, function (file, callback) {
    fs.outputFile(
      path.join(
        cwd, 'dist', file.permalink, 'index.html'
      ),
      file.html,
      callback
    )
  }, callback)
}
