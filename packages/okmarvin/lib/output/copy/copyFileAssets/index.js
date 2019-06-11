'use strict'

const path = require('path')
const fs = require('fs-extra')
const logger = require('@parcel/logger')
const { prettyTime } = require('@okmarvin/helpers')
const async = require('neo-async')

module.exports = function(conn, callback) {
  const begin = Date.now()
  const { root, dest, files } = conn
  const filesCouldHaveAssets = files
    .filter(file => file.filePath)
    .filter(file => {
      if (path.join(file.filePath, '..') === '_posts') {
        return false
      }
      if (path.join(file.filePath, '..') === '_pages') {
        return false
      }
      return true
    })
  async.parallel(
    filesCouldHaveAssets.map(file => callback => {
      fs.copy(
        path.join(root, file.filePath, '..'),
        path.join(root, dest, file.permalink),
        {
          filter: (src, dest) => {
            return !src.endsWith('.md')
          }
        },
        callback
      )
    }),
    (err, _results) => {
      if (err) return callback(err)
      logger.verbose(`File assets copied in ${prettyTime(Date.now() - begin)}`)
      return callback(null, conn)
    }
  )
}
