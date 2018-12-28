const async = require('neo-async')
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
module.exports = function (conn, callback) {
  const { root, to, files } = conn
  async.each(
    files,
    function (file, callback) {
      if (!file.filePath) {
        // composed page
        // no need to copy
        return callback(null)
      }
      if (
        ['post', 'page'].includes(path.basename(path.join(file.filePath, '..')))
      ) {
        // right under post|page folder
        return callback(null)
      } else {
        glob(
          path.join(file.filePath, '..', '/*'),
          {
            ignore: ['**/*.md']
          },
          (err, assets) => {
            if (err) return callback(err)
            if (!assets.length) return callback(null)
            async.parallel(
              assets.map(
                asset =>
                  function (callback) {
                    const basename = path.basename(asset)
                    const dest = path.join(root, to, file.permalink, basename)
                    fs.copy(asset, dest, callback)
                  }
              ),
              callback
            )
          }
        )
      }
    },
    err => {
      if (err) return callback(err)
      return callback(null, conn)
    }
  )
}
