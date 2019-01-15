const groupBy = require('lodash/fp/groupby')
const async = require('async')
function print (arr) {
  return arr.map(i => `\n` + i.filePath || i.title)
}
module.exports = function (conn, callback) {
  const { files } = conn
  const groupsByPermalink = groupBy(file => file.permalink, files)
  async.parallel(
    [
      callback => {
        async.each(
          Object.keys(groupsByPermalink),
          (key, callback) => {
            if (groupsByPermalink[key].length > 1) {
              return callback(
                new Error(
                  `Please fix the duplicated permalinks: ${print(groupsByPermalink[key])}`
                )
              )
            }
            return callback()
          },
          callback
        )
      }
    ],
    err => {
      if (err) return callback(err)
      callback(null, conn)
    }
  )
}
