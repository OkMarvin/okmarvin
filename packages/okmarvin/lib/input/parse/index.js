const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../../helpers/prettyTime')

const findSiblings = require('./findSiblings')
const findRelated = require('./findRelated')

const parseFiles = require('./parseFiles')

const collect = require('./collect')

const connSchema = require('../../schemas/conn')

const ajv = require('../../helpers/ajv')

module.exports = function (conn, callback) {
  const begin = Date.now()

  async.waterfall(
    [
      callback => {
        parseFiles(conn, callback)
      },
      findSiblings,
      collect,
      findRelated
    ],
    (err, conn) => {
      if (err) return callback(err)
      logger.success(`Parsed ${conn.files.length} files in ${prettyTime(Date.now() - begin)}`)
      // will move it to later step
      if (!ajv.validate(connSchema, conn)) {
        return callback(ajv.errors)
      }
      callback(null, conn)
    }
  )
}