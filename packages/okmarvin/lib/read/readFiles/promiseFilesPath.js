const glob = require('glob')
const { relative } = require('path')
module.exports = function (content) {
  return new Promise((resolve, reject) => {
    const searchPattern = '{post,page}/**/*.{md,markdown}'
    // TODO we might add `cache` to save some fs calls
    // TODO how to limit files number with glob
    const opts = { cwd: content, absolute: true, nodir: true }
    try {
      const files = glob.sync(searchPattern, opts)
      resolve(files.map(file => relative(content, file)))
    } catch (err) {
      reject(err)
    }
  })
}
