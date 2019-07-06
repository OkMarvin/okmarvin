'use strict'
/**
 * tag related posts
 */
const uniqBy = require('lodash/fp/uniqBy')
const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = conn => {
  const { files, tags } = conn
  const posts = files.filter(isPost)
  const others = files.filter(file => !posts.includes(file))
  return {
    ...conn,
    files: [
      ...posts.map(post => {
        const related = Object.keys(tags)
          .filter(key => {
            return !(post.tags || [])
              .map(tag => tag.toLowerCase())
              .includes(key)
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
            return shrink(post)
          })
        return { ...post, related: uniqBy('permalink', related).slice(0, 10) }
      }),
      ...others
    ]
  }
}
