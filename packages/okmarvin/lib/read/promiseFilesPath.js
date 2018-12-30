const glob = require('glob')
module.exports = function (content) {
  return new Promise((resolve, reject) => {
    const searchPattern = '{post,page}/**/*.{md,markdown}'
    const opts = { cwd: content, absolute: true }
    try {
      const files = glob.sync(searchPattern, opts)
      resolve(files)
    } catch (err) {
      reject(err)
    }
  })
}
