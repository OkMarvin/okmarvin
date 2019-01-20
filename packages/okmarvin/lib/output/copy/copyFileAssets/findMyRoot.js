const path = require('path')

const findMyRoot = (asset, cachedAsset, roots) => {
  const myParent = path.join(asset, '..')
  if (myParent === '_posts' || myParent === '_pages') {
    // prevent infinite loop
    // just return undefined, it won't happen
    return [undefined, undefined]
  }
  const findMyParent = roots.find(root => root === myParent)
  if (findMyParent) {
    return [findMyParent, path.relative(findMyParent, cachedAsset)]
  } else {
    // walk up
    return findMyRoot(myParent, cachedAsset, roots)
  }
}
module.exports = findMyRoot
