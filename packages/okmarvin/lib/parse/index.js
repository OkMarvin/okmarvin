const async = require('neo-async')
const logger = require('@okmarvin/logger')

const findSiblings = require('./findSiblings')
const findRelated = require('./findRelated')

const parseFile = require('./parseFile')

module.exports = function (conn, callback) {
  logger.profile('parse')
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
      logger.profile('parse')
      if (err) return callback(err)
      callback(null, {
        ...conn,
        files
      })
    }
  )
}
