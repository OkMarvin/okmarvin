'use strict'

const path = require('path')
const fs = require('fs-extra')
const logger = require('@parcel/logger')
const { prettyTime } = require('@okmarvin/helpers')
const async = require('neo-async')
const findPotentialAssetRootPermalinkMap = require('./findPotentialAssetRootPermalinkMap')
const connectAssetToFilePermalink = require('./connectAssetToFilePermalink')

module.exports = function (conn, callback) {
  const begin = Date.now()
  const { root, dest, files, fileAssets } = conn
  const fileAssetRootPermalinkMap = findPotentialAssetRootPermalinkMap(files)
  const maps = connectAssetToFilePermalink(fileAssets, fileAssetRootPermalinkMap)
  async.parallel(
    maps.map(([asset, target]) => callback => {
      fs.copy(
        asset,
        path.join(root, dest, target),
        callback
      )
    }),
    (err, _results) => {
      if (err) return callback(err)
      logger.verbose(
        `File assets copied in ${prettyTime(Date.now() - begin)}`
      )
      return callback(null, conn)
    }
  )
}
