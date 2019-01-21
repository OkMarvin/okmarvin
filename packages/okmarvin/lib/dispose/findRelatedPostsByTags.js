'use strict'

const async = require('neo-async')
const uniqBy = require('lodash/fp/uniqBy')
const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = function (conn, callback) {
  const { files, tags } = conn
  const posts = files.filter(isPost)
  const others = files.filter(file => !posts.includes(file))
  async.map(
    posts,
    (post, callback) => {
      const related = Object.keys(tags)
        .filter(key => {
          return !(post.tags || []).map(tag => tag.toLowerCase()).includes(key)
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
      callback(null, { ...post, related: uniqBy('permalink', related) })
    },
    function (err, posts) {
      if (err) return callback(err)
      return callback(null, { ...conn, files: [...others, ...posts] })
    }
  )
}
