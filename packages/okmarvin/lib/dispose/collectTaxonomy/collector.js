const async = require('async')
const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = (files, target, callback) => {
  const results = {}
  const posts = files.filter(isPost)
  async.each(
    posts,
    (file, callback) => {
      if (file[target]) {
        const _ = Array.isArray(file[target]) ? file[target] : [file[target]]
        _.map(i => {
          const lowerCaseVersion = i.toLowerCase()
          if (!results[lowerCaseVersion]) {
            // init
            results[lowerCaseVersion] = []
          }
          results[lowerCaseVersion] = results[lowerCaseVersion].concat(
            shrink(file)
          )
        })
        callback()
      } else {
        callback()
      }
    },
    err => {
      if (err) return callback(err)
      return callback(null, results)
    }
  )
}
