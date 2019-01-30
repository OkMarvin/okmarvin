const path = require('path')
const findMyRoot = require('./findMyRoot')
const fileAssetRootPermalinkMap = {
  [path.join('_pages/about')]: '/about/',
  [path.join('_posts/hello-okmarvin')]: '/hello-okmarvin/'
}
test('', () => {
  expect(
    findMyRoot(
      path.join('_pages/about/a.txt'),
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual([path.join('_pages/about'), 'a.txt'])
})
test('', () => {
  expect(
    findMyRoot(
      path.join('_pages/about/demo/a.txt'),
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual([path.join('_pages/about'), path.join('demo/a.txt')])
})
test('', () => {
  expect(
    findMyRoot(
      path.join('_pages/about/demo/demo/a.txt'),
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual([path.join('_pages/about'), path.join('demo/demo/a.txt')])
})
