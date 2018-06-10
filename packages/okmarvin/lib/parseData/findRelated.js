const async = require('neo-async')
const uniqBy = require('lodash/uniqby')
const collectTags = require('./collectTags')
const isPost = require('./isPost')
module.exports = function (files, callback) {
  const posts = files.filter(isPost)
  const others = files.filter(file => file.template !== 'post.js')
  async.waterfall(
    [
      callback => collectTags(files, callback),
      (topics, callback) => {
        async.map(
          posts,
          (file, callback) => {
            const related = Object.keys(topics)
              .filter(key => {
                return (file.tags || []).indexOf(key) !== -1
              })
              .map(k => topics[k])
              .reduce((acc, topic) => {
                return acc.concat(topic)
              }, [])
              .filter(relate => {
                return relate.permalink !== file.permalink
              })
              .sort((a, b) => b.datePublished - a.datePublished)
            callback(null, { ...file, related: uniqBy(related, 'permalink') })
          },
          callback
        )
      }
    ],
    function (err, posts) {
      if (err) return callback(err)
      return callback(null, [...others, ...posts])
    }
  )
}
