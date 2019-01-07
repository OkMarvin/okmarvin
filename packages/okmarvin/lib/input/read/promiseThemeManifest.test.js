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
      'page.js': 'page.js',
      'client.js': 'client.abc.js'
    })
  })
})
