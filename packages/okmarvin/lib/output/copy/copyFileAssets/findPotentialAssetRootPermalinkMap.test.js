const path = require('path')
const findPotentialAssetRootPermalinkMap = require('./findPotentialAssetRootPermalinkMap')
test('', () => {
  expect(
    findPotentialAssetRootPermalinkMap([
      {
        filePath: path.join('_posts/hello/index.md'),
        permalink: '/'
      },
      {
        filePath: path.join('_pages/test.md'),
        permalink: '/test'
      }
    ])
  ).toEqual({ [path.join('_posts/hello')]: '/' })
})
test('we wont allow file assets right under _posts', () => {
  expect(
    findPotentialAssetRootPermalinkMap([{
      filePath: path.join('_posts/om.md'),
      permalink: '/om'
    }])
  ).toEqual({})
})
