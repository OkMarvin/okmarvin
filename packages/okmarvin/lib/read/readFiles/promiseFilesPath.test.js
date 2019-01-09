const path = require('path')
const promiseFilesPath = require('./promiseFilesPath')
test('returns file lists', () => {
  const content = path.join(__dirname, '..', 'fixtures/content')
  return promiseFilesPath(content).then(data => {
    expect(data.sort()).toEqual(
      [
        path.join(content, 'post/hello-okmarvin.md'),
        path.join(content, 'page/about-okmarvin.md')
      ].sort()
    )
  })
})
