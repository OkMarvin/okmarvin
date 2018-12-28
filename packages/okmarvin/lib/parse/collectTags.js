const async = require('async')
const isPost = require('./isPost')
module.exports = function (conn, callback) {
  const { files } = conn
  const tags = Object.create(null)
  const posts = files.filter(isPost)
  async.each(
    posts,
    (file, callback) => {
      file.tags &&
        file.tags.map(tag => {
          const tagLowerCase = tag.toLowerCase()
          if (!tags[tagLowerCase]) {
            // init
            tags[tagLowerCase] = []
          }
          // exclude `content` to reduce memory usage
          const { content, ...others } = file
          tags[tagLowerCase] = tags[tagLowerCase].concat(others)
        })
      callback()
    },
    err => {
      if (err) return callback(err)
      return callback(null, { ...conn, tags })
    }
  )
}
