const fs = require('fs')
const parseMarkdown = require('./parseMarkdown')
module.exports = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) return callback(err)
    callback(null, [filePath, parseMarkdown(fileContent)])
  })
}
