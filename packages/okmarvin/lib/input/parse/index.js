const async = require('neo-async')
const logger = require('@parcel/logger')
const prettyTime = require('../../helpers/prettyTime')

const findPostSiblings = require('./findPostSiblings')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

const parseFiles = require('./parseFiles')

const collectTaxonomy = require('./collectTaxonomy')

const connSchema = require('../../schemas/conn')

const ajv = require('../../helpers/ajv')

module.exports = function (conn, callback) {
  const begin = Date.now()

  async.waterfall(
    [
      callback => {
        parseFiles(conn, callback)
      },
      findPostSiblings,
      collectTaxonomy,
      findRelatedPostsByTags
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
