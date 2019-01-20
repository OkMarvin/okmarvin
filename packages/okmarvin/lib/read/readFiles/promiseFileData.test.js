const path = require('path')
const promiseFileData = require('./promiseFileData')
test('returns array', () => {
  const root = path.join(__dirname, '..', 'fixtures')
  const filePath = '_pages/about-okmarvin.md'
  return promiseFileData(root, filePath).then(data => {
    expect(data).toEqual({
      filePath,
      content: 'this is content',
      title: 'about okmarvin',
      date: new Date('2019-10-10'),
      excerpt: '',
      isEmpty: false,
      stats: {
        ctimeMs: expect.any(Number)
      }
    })
  })
})
