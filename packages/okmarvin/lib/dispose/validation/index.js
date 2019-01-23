'use strict'

/**
 * finds all duplicate permalinks and reports to user
 */
module.exports = conn => {
  const { files } = conn
  const groupsByPermalink = files.reduce((acc, file) => {
    if (acc[file.permalink]) {
      acc[file.permalink] = [
        ...acc[file.permalink],
        { filePath: file.filePath, title: file.title }
      ]
    } else {
      acc[file.permalink] = [{ filePath: file.filePath, title: file.title }]
    }
    return acc
  }, {})
  const errors = Object.entries(groupsByPermalink)
    .filter(([_permalink, items]) => items.length > 1)
    .reduce((acc, [permalink, items]) => {
      acc[permalink] = items.map(item => item.filePath || item.title)
      return acc
    }, {})

  if (Object.keys(errors).length) {
    console.error(`Duplicate permalinks detected:`)
    Object.entries(errors).forEach(([key, value]) => {
      console.error(key, value)
    })
    throw new Error('You should fix them first.')
  }
  return conn
}
