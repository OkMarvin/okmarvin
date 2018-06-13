const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const logger = require('@okmarvin/logger')
module.exports = function (data, callback) {
  const { files, cwd, destination } = data
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
            fs.outputFile(
              path.join(cwd, destination, decodeURIComponent(target)),
              file.html,
              callback
            )
          },
          callback
        )
    ],
    err => {
      if (err) return callback(err)
      logger.info(`${files.length} files generated.`)
      return callback(null, data)
    }
  )
}
