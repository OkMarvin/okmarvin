const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const writeFeed = require('./writeFeed')
const writeSitemap = require('./writeSitemap')
module.exports = function (data, callback) {
  const { files, cwd, destination } = data
  async.parallel(
    [
      callback =>
        async.each(
          files,
          function (file, callback) {
            fs.outputFile(
              path.join(cwd, destination, file.permalink, 'index.html'),
              file.html,
              callback
            )
          },
          callback
        ),
      callback => writeFeed(data, callback),
      callback => writeSitemap(data, callback)
    ],
    err => {
      if (err) return callback(err)
      return callback(null, data)
    }
  )
}
