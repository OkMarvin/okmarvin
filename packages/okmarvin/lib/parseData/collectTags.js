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
          if (!topics[tag]) {
            // init
            topics[tag] = []
          }
          topics[tag] = topics[tag].concat(file)
        })
      callback()
    },
    err => {
      if (err) return callback(err)
      return callback(null, topics)
    }
  )
}
