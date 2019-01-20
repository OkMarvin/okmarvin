const findMyRoot = require('./findMyRoot')
const path = require('path')

module.exports = (assets, fileAssetRootPermalinkMap) => {
  const roots = Object.keys(fileAssetRootPermalinkMap)
  return assets.map(asset => {
    const [myRoot, myRelativePath] = findMyRoot(asset, roots)
    return [asset, path.join(fileAssetRootPermalinkMap[myRoot], myRelativePath)]
  })
}
