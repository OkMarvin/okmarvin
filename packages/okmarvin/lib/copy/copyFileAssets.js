const async = require('neo-async')
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
module.exports = function (conn, data, callback) {
  const { files } = data
  const { root, to } = conn
  async.each(
    files,
    function (file, callback) {
      // if file is right under post/page directory, assume no file assets
      // needed to be copied, they should be put inside own directory
      if (!file.filePath) {
        // composed list page
        // no need to copy
        return callback(null)
      }
      if (
        ['post', 'page'].includes(path.basename(path.join(file.filePath, '..')))
      ) {
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
      return callback(null, conn, data)
    }
  )
}
