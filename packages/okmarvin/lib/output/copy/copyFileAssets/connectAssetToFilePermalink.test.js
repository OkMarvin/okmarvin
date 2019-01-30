const path = require('path')
const connectAssetToFile = require('./connectAssetToFilePermalink')
test('', () => {
  expect(
    connectAssetToFile([path.join('_posts/why/demo/index.html')], {
      [path.join('_posts/why')]: '/why-okmarvin'
    }).sort()
  ).toEqual(
    [[path.join('_posts/why/demo/index.html'), path.join('/why-okmarvin/demo/index.html')]].sort()
  )
})
