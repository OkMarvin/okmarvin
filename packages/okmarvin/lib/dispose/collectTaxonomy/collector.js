'use strict'
const { isPost, shrink } = require('@okmarvin/helpers')
module.exports = (files, target) => {
  const posts = files.filter(isPost)
  return posts.reduce((acc, file) => {
    if (file[target]) {
      const _ = Array.isArray(file[target]) ? file[target] : [file[target]]
      _.map(i => {
        const lowerCaseVersion = i.toLowerCase()
        if (!acc[lowerCaseVersion]) {
          // init
          acc[lowerCaseVersion] = []
        }
        acc[lowerCaseVersion] = [...acc[lowerCaseVersion], shrink(file)]
      })
    }
    return acc
  }, {})
}
