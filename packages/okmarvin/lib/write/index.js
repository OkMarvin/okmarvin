const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const { files } = conn
  const { root, to, builtAt } = conn
  async.parallel(
    [
      callback => {
        fs.outputJson(
          path.join(root, '_cache.json'),
          {
            lastBuiltAt: builtAt
          },
          err => {
            if (err) return callback(err)
            callback(null)
          }
        )
      },
      callback =>
        async.each(
          files,
          function (file, callback) {
            const target =
              path.extname(file.permalink) !== ''
                ? file.permalink
                : path.join(file.permalink, 'index.html')
            const filePath = path.join(root, to, decodeURIComponent(target))
            fs.outputFile(filePath, file.html, callback)
          },
          callback
        )
    ],
    err => {
      if (err) return callback(err)
      logger.success(`${files.length} files generated.`)
      return callback(null, conn)
    }
  )
}
