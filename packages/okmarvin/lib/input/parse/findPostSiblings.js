const async = require('neo-async')
const isPost = require('./isPost')
const isNotPost = require('./isNotPost')
module.exports = function (conn, callback) {
  const { files } = conn
  const listOfPosts = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  const others = files.filter(isNotPost)
  async.map(
    listOfPosts,
    (post, callback) => {
      const idx = listOfPosts.findIndex(el => el.permalink === post.permalink)
      if (idx === -1) return callback(null, post)
      const siblings = Object.create(null)
      if (listOfPosts[idx - 1]) {
        const { content, description, ...others } = listOfPosts[idx - 1]
        siblings['newerSibling'] = { ...others }
      }
      if (listOfPosts[idx + 1]) {
        const { content, description, ...others } = listOfPosts[idx + 1]
        siblings['olderSibling'] = { ...others }
      }
      callback(null, { ...post, ...siblings })
    },
    (err, posts) => {
      if (err) return callback(err)
      callback(null, { ...conn, files: [...posts, ...others] })
    }
  )
}
