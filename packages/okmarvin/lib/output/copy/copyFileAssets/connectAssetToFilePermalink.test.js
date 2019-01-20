const connectAssetToFile = require('./connectAssetToFilePermalink')
test('', () => {
  expect(
    connectAssetToFile(['_posts/why/demo/index.html'], {
      '_posts/why': '/why-okmarvin'
    }).sort()
  ).toEqual(
    [['_posts/why/demo/index.html', '/why-okmarvin/demo/index.html']].sort()
  )
})
