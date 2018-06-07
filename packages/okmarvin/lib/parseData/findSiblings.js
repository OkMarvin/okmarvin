const async = require('neo-async')
module.exports = function (files, callback) {
  const listOfPosts = files
    .filter(file => file.template === 'post.js')
    .sort((a, b) => b.datePublished - a.datePublished)
  async.map(
    files,
    (file, callback) => {
      const idx = listOfPosts.findIndex(el => el.permalink === file.permalink)
      if (idx === -1) return callback(null, file)
      const siblings = {}
      if (listOfPosts[idx - 1]) {
        siblings['newerSibling'] = listOfPosts[idx - 1]
      }
      if (listOfPosts[idx + 1]) {
        siblings['olderSibling'] = listOfPosts[idx + 1]
      }
      callback(null, {...file, ...siblings})
    },
    callback
  )
}
