const findPotentialAssetRootPermalinkMap = require('./findPotentialAssetRootPermalinkMap')
test('', () => {
  expect(
    findPotentialAssetRootPermalinkMap([
      {
        filePath: '_posts/hello/index.md',
        permalink: '/'
      },
      {
        filePath: '_pages/test.md',
        permalink: '/test'
      }
    ])
  ).toEqual({ '_posts/hello': '/' })
})
test('we wont allow file assets right under _posts', () => {
  expect(
    findPotentialAssetRootPermalinkMap([{
      filePath: '_posts/om.md',
      permalink: '/om'
    }])
  ).toEqual({})
})
