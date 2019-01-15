const groupBy = require('lodash/fp/groupby')
const logger = require('@parcel/logger')
module.exports = function (conn, callback) {
  const { files } = conn
  const groupsByPermalink = groupBy(file => file.permalink, files)
  const errors = Object.entries(groupsByPermalink)
    .filter(([_permalink, items]) => items.length > 1)
    .reduce((acc, [permalink, items]) => {
      acc.set(permalink, items.map(item => item.filePath || item.title))
      return acc
    }, new Map())

  if (errors.size) {
    logger.error(`Duplicate permalinks detected, please fix:`)
    errors.forEach((value, key) => {
      console.log(key, value)
    })
    process.exit(1)
  }
  callback(null, conn)
}
