const glob = require('glob')
module.exports = function (content) {
  return new Promise((resolve, reject) => {
    const searchPattern = '{post,page}/**/*.{md,markdown}'
    // TODO we might add `cache` to save some fs calls
    const opts = { cwd: content, absolute: true, nodir: true, nosort: true }
    try {
      const files = glob.sync(searchPattern, opts)
      resolve(files)
    } catch (err) {
      reject(err)
    }
  })
}
