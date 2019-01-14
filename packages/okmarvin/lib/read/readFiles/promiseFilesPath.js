const glob = require('glob')
const { relative } = require('path')
module.exports = function (pathToSource) {
  return new Promise((resolve, reject) => {
    const searchPattern = '{post,page}/**/*.{md,markdown}'
    // TODO we might add `cache` to save some fs calls
    // TODO how to limit files number with glob
    const opts = { cwd: pathToSource, absolute: true, nodir: true }
    try {
      const files = glob.sync(searchPattern, opts)
      resolve(files.map(file => relative(pathToSource, file)))
    } catch (err) {
      reject(err)
    }
  })
}
