const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
const prettyTime = require('../../helpers/prettyTime')
module.exports = function (conn, callback) {
  const begin = Date.now()
  const { files, clean } = conn
  const dirtyFiles = files.filter(file => file.dirty)
  const { root, to, builtAt, siteConfig } = conn
  const { themeManifest, layoutHash } = siteConfig
  async.parallel(
    [
      callback => {
        fs.outputJson(
          path.join(root, '_cache.json'),
          {
            lastBuiltAt: builtAt,
            lastThemeManifest: themeManifest,
            files: files.map(file => file.permalink),
            layoutHash
          },
          err => {
            if (err) return callback(err)
            callback(null)
          }
        )
      },
      callback =>
        async.each(
          clean === false ? dirtyFiles : files,
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
      logger.success(
        `Wrote ${
          (clean === false ? dirtyFiles : files).length
        } files in ${prettyTime(Date.now() - begin)}.`
      )
      return callback(null, conn)
    }
  )
}
