const findMyRoot = require('./findMyRoot')
const fileAssetRootPermalinkMap = {
  '_pages/about': '/about/',
  '_posts/hello-okmarvin': '/hello-okmarvin/'
}
test('', () => {
  expect(
    findMyRoot(
      '_pages/about/a.txt',
      '_pages/about/a.txt',
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual(['_pages/about', 'a.txt'])
})
test('', () => {
  expect(
    findMyRoot(
      '_pages/about/demo/a.txt',
      '_pages/about/demo/a.txt',
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual(['_pages/about', 'demo/a.txt'])
})
test('', () => {
  expect(
    findMyRoot(
      '_pages/about/demo/demo/a.txt',
      '_pages/about/demo/demo/a.txt',
      Object.keys(fileAssetRootPermalinkMap)
    )
  ).toEqual(['_pages/about', 'demo/demo/a.txt'])
})
