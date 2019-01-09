const async = require('async')
const isPost = require('../isPost')
const shrink = require('../../../helpers/shrink')
module.exports = function (files, target, callback) {
  const results = Object.create(null)
  const posts = files.filter(isPost)
  async.each(
    posts,
    (file, callback) => {
      file[target] &&
        file[target].map(i => {
          const lowerCaseVersion = i.toLowerCase()
          if (!results[lowerCaseVersion]) {
            // init
            results[lowerCaseVersion] = []
          }
          results[lowerCaseVersion] = results[lowerCaseVersion].concat(shrink(file))
        })
      callback()
    },
    err => {
      if (err) return callback(err)
      return callback(null, results)
    }
  )
}