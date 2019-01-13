const path = require('path')
const promiseFilesPath = require('./promiseFilesPath')
test('returns file lists', () => {
  const content = path.join(__dirname, '..', 'fixtures/content')
  return promiseFilesPath(content).then(data => {
    expect(data).toEqual(['page/about-okmarvin.md', 'post/hello-okmarvin.md'])
  })
})
