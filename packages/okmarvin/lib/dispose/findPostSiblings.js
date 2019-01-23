'use strict'

const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = conn => {
  const { files } = conn
  const listOfPosts = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  return {
    ...conn,
    files: [
      ...listOfPosts.map(post => {
        const idx = listOfPosts.findIndex(el => el.permalink === post.permalink)
        if (idx === -1) return post
        const siblings = Object.create(null)
        if (listOfPosts[idx - 1]) {
          siblings['newerSibling'] = shrink(listOfPosts[idx - 1])
        }
        if (listOfPosts[idx + 1]) {
          siblings['olderSibling'] = shrink(listOfPosts[idx + 1])
        }
        return { ...post, ...siblings }
      }),
      ...files.filter(file => !listOfPosts.includes(file))
    ]
  }
}
