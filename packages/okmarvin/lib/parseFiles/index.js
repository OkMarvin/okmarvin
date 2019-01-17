const async = require('neo-async')
const parseFile = require('./parseFile')
const logger = require('@parcel/logger')
const { prettyTime } = require('@okmarvin/helpers')
module.exports = function (conn, callback) {
  const begin = Date.now()

  const { files, ...others } = conn

  async.map(
    files,
    (file, callback) => {
      parseFile(conn, file, callback)
    },
    (err, files) => {
      if (err) return callback(err)
      logger.verbose(
        `Parsed ${files.length} files in ${prettyTime(Date.now() - begin)}`
      )
      callback(null, { ...others, files })
    }
  )
}
