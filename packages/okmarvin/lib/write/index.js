const async = require('neo-async')
const path = require('path')
const logger = require('@parcel/logger')
const fs = require('fs-extra')
const createOutputStream = require('create-output-stream')
module.exports = function (conn, callback) {
  const { files } = conn
  const { root, to } = conn
  async.parallel(
    [
      callback =>
        async.each(
          files,
          function (file, callback) {
            const target =
              path.extname(file.permalink) !== ''
                ? file.permalink
                : path.join(file.permalink, 'index.html')
            const filePath = path.join(root, to, decodeURIComponent(target))
            if (files.length > 200) {
              // we don't want to consume too many memory here
              let writeStream = createOutputStream(filePath)
              writeStream.on('finish', () => {
                callback()
              })
              writeStream.on('error', err => {
                callback(err)
              })
              writeStream.write(file.html)
              writeStream.end()
            } else {
              fs.outputFile(filePath, file.html, callback)
            }
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
