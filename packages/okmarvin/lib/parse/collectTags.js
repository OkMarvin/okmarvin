const async = require('async')
const isPost = require('./isPost')
module.exports = function (files, callback) {
  const topics = Object.create(null)
  const posts = files.filter(isPost)
  async.each(
    posts,
    (file, callback) => {
      file.tags &&
        file.tags.map(tag => {
          const tagLowerCase = tag.toLowerCase()
          if (!topics[tagLowerCase]) {
            // init
            topics[tagLowerCase] = []
          }
          // exclude `content` to reduce memory usage
          const { content, ...others } = file
          topics[tagLowerCase] = topics[tagLowerCase].concat(others)
        })
      callback()
    },
    err => {
      if (err) return callback(err)
      return callback(null, topics)
    }
  )
}
