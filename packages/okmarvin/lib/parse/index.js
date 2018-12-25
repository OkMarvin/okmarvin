const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../helpers/prettyTime')

const findSiblings = require('./findSiblings')
const findRelated = require('./findRelated')

const parseFile = require('./parseFile')

module.exports = function (conn, callback) {
  const begin = Date.now()
  const { files } = conn

  async.waterfall(
    [
      callback => {
        async.map(
          files,
          (file, callback) => {
            const [filePath, { data, ...others }] = file
            parseFile(conn, { filePath, ...data, ...others }, callback)
          },
          callback
        )
      },
      findSiblings,
      findRelated
    ],
    (err, files) => {
      if (err) return callback(err)
      logger.success(`Parsed in ${prettyTime(Date.now() - begin)}`)
      callback(null, {
        ...conn,
        files
      })
    }
  )
}
