const async = require('neo-async')
const uniqBy = require('lodash/uniqby')
module.exports = function (files, callback) {
  const topics = Object.create(null)
  const posts = files.filter(file => file.template === 'post.js')
  const others = files.filter(file => file.template !== 'post.js')
  async.waterfall(
    [
      callback =>
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
          callback
        ),
      callback => {
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
