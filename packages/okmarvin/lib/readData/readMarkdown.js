const fs = require('fs')
const parseMarkdown = require('./parseMarkdown')
module.exports = function (file, callback) {
  fs.readFile(file, 'utf8', (err, fileContent) => {
    if (err) return callback(err)
    callback(null, {
      [file]: parseMarkdown(fileContent)
    })
  })
}
