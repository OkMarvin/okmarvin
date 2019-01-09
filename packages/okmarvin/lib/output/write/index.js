'use strict'

const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')

const { prettyTime } = require('@okmarvin/helpers')

module.exports = function (conn, callback) {
  const begin = performance.now()
  const { files, okmarvinConfig } = conn
  const {
    root,
    dest,
    builtAt,
    siteConfig,
    themeManifest,
    layoutHash,
    clientJsManifest
  } = conn
  async.parallel(
    [
      callback => {
        fs.outputJson(
          path.join(root, '_cache.json'),
          {
            builtAt,
            themeManifest,
            clientJsManifest,
            files: files.map(file => file.permalink),
            layoutHash,
            okmarvinConfig,
            siteConfig
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
            const filePath = path.join(root, dest, decodeURIComponent(target))
            fs.outputFile(filePath, file.html, callback)
          },
          callback
        )
    ],
    err => {
      if (err) return callback(err)
      logger.success(
        `Wrote ${files.length} files in ${prettyTime(
          performance.now() - begin
        )}.`
      )
      return callback(null, conn)
    }
  )
}
