const async = require('neo-async')
const isPost = require('./isPost')
module.exports = function (files, callback) {
  const listOfPosts = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  async.map(
    files,
    (file, callback) => {
      const idx = listOfPosts.findIndex(el => el.permalink === file.permalink)
      if (idx === -1) return callback(null, file)
      const siblings = {}
      if (listOfPosts[idx - 1]) {
        const { title, permalink } = listOfPosts[idx - 1]
        siblings['newerSibling'] = { title, permalink }
      }
      if (listOfPosts[idx + 1]) {
        const { title, permalink } = listOfPosts[idx + 1]
        siblings['olderSibling'] = { title, permalink }
      }
      callback(null, { ...file, ...siblings })
    },
    callback
  )
}
