'use strict'

const groupBy = require('lodash/fp/groupby')
module.exports = conn => {
  const { files } = conn
  const groupsByPermalink = groupBy(file => file.permalink, files)
  const errors = Object.entries(groupsByPermalink)
    .filter(([_permalink, items]) => items.length > 1)
    .reduce((acc, [permalink, items]) => {
      acc[permalink] = items.map(item => item.filePath || item.title)
      return acc
    }, {})

  if (Object.keys(errors).length) {
    console.error(`Duplicate permalinks detected, please fix:`)
    return Object.entries(errors).forEach(([key, value]) => {
      console.log(key, value)
    })
  }
  return conn
}
