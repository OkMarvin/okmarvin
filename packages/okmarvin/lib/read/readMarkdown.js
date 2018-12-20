const fs = require('fs')
const matter = require('gray-matter')
module.exports = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) return reject(err)
      resolve([filePath, matter(fileContent)])
    })
  })
}
