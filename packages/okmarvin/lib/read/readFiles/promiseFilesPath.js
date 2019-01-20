const glob = require('glob')
module.exports = function (root, searchPattern) {
  return new Promise((resolve, reject) => {
    // TODO we might add `cache` to save some fs calls
    // TODO how to limit files number with glob
    const opts = { cwd: root, absolute: false, nodir: true } // nodir to save some memories
    try {
      resolve(glob.sync(searchPattern, opts))
    } catch (err) {
      reject(err)
    }
  })
}
