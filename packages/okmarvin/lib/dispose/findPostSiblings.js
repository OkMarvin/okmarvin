'use strict'

const async = require('neo-async')
const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = function (conn, callback) {
  const { files } = conn
  const listOfPosts = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  async.map(
    listOfPosts,
    (post, callback) => {
      const idx = listOfPosts.findIndex(el => el.permalink === post.permalink)
      if (idx === -1) return callback(null, post)
      const siblings = Object.create(null)
      if (listOfPosts[idx - 1]) {
        siblings['newerSibling'] = shrink(listOfPosts[idx - 1])
      }
      if (listOfPosts[idx + 1]) {
        siblings['olderSibling'] = shrink(listOfPosts[idx + 1])
      }
      callback(null, { ...post, ...siblings })
    },
    (err, posts) => {
      if (err) return callback(err)
      callback(null, {
        ...conn,
        files: [...posts, ...files.filter(file => !listOfPosts.includes(file))]
      })
    }
  )
}
