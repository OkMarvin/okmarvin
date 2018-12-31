const async = require('neo-async')
const uniqBy = require('lodash/uniqBy')
const isPost = require('./isPost')
const isNotPost = require('./isNotPost')
module.exports = function (conn, callback) {
  const { files, tags } = conn
  const posts = files.filter(isPost)
  const others = files.filter(isNotPost)
  async.map(
    posts,
    (post, callback) => {
      const related = Object.keys(tags)
        .filter(key => {
          return (post.tags || []).map(tag => tag.toLowerCase()).indexOf(key) !== -1
        })
        .map(k => tags[k])
        .reduce((acc, topic) => {
          return acc.concat(topic)
        }, [])
        .filter(relate => {
          return relate.permalink !== post.permalink
        })
        .sort((a, b) => b.datePublished - a.datePublished)
        .map(post => {
          const { content, description, ...others } = post
          return { ...others }
        })
      callback(null, { ...post, related: uniqBy(related, 'permalink') })
    },
    function (err, posts) {
      if (err) return callback(err)
      return callback(null, { ...conn, files: [...others, ...posts] })
    }
  )
}
