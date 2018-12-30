const path = require('path')
const promiseThemeManifest = require('./promiseThemeManifest')
test('returns theme manifest', () => {
  return promiseThemeManifest(
    path.join(__dirname, 'fixtures'),
    './themes/hello'
  ).then(data => {
    expect(data).toEqual({
      'index.js': 'index.js',
      'post.js': 'post.js',
      'page.js': 'page.js'
    })
  })
})
test('throws', () => {
  const catcher = jest.fn()
  return promiseThemeManifest(
    path.join(__dirname, 'fixtures'),
    './themes/broken'
  )
    .catch(catcher)
    .then(() => expect(catcher).toBeCalled())
})
