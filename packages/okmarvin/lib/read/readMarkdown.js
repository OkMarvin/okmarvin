const fs = require('fs')
const matter = require('gray-matter')
module.exports = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) return callback(err)
    callback(null, [filePath, matter(fileContent)])
  })
}
