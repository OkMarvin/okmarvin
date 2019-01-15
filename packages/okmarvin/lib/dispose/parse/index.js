const async = require('neo-async')
const logger = require('@parcel/logger')

const findPostSiblings = require('./findPostSiblings')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

const parseFiles = require('./parseFiles')

const collectTaxonomy = require('./collectTaxonomy')

const connSchema = require('../../schemas/conn')

const { prettyTime, ajv } = require('@okmarvin/helpers')

module.exports = function (conn, callback) {
  const begin = Date.now()

  async.waterfall(
    [
      async.constant(conn),
      parseFiles,
      findPostSiblings,
      collectTaxonomy,
      findRelatedPostsByTags
    ],
    (err, conn) => {
      if (err) return callback(err)
      logger.success(
        `Parsed ${conn.files.length} files in ${prettyTime(
          Date.now() - begin
        )}`
      )
      // will move it to later step
      if (!ajv.validate(connSchema, conn)) {
        return callback(ajv.errors)
      }
      callback(null, conn)
    }
  )
}
