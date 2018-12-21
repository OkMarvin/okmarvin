const glob = require('glob')
module.exports = function (content) {
  return new Promise((resolve, reject) => {
    const searchPattern = '{post,page}/**/*.md'
    const opts = { cwd: content, absolute: true }
    glob(searchPattern, opts, (err, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  })
}
