const path = require('path')
module.exports = files => {
  return files
    .filter(file => file.filePath) // ignore composed pages
    .filter(file => {
      // we don't allow file assets right under _posts or _pages
      // it will mess the directory
      const parent = [...path.join(file.filePath, '..').split(path.sep)].pop()
      if (parent === '_posts') return false
      if (parent === '_pages') return false
      return true
    })
    .map(file => [path.join(file.filePath, '..'), file.permalink])
    .reduce((acc, [dir, permalink]) => {
      acc[dir] = permalink
      return acc
    }, {})
}
