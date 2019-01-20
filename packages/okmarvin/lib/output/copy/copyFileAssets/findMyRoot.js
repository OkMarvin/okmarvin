const path = require('path')

module.exports = (asset, roots) => {
  const cachedAsset = asset
  const findMyRoot = (asset, roots) => {
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
      return findMyRoot(myParent, roots)
    }
  }
  return findMyRoot(asset, roots)
}
