const path = require('path')
const promiseFileData = require('./promiseFileData')
test('returns array', () => {
  const filePath = path.join(
    __dirname,
    'fixtures',
    'content/page/about-okmarvin.md'
  )
  return promiseFileData(filePath).then(data => {
    expect(data).toEqual([
      filePath,
      {
        content: 'this is content',
        data: {
          title: 'about okmarvin',
          date: new Date('2019-10-10')
        },
        excerpt: '',
        isEmpty: false,
        stats: {
          ctimeMs: expect.any(Number)
        }
      }
    ])
  })
})
