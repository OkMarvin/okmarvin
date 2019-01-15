const path = require('path')
const readFiles = require('./index')
const conn = {
  root: path.join(__dirname, '..', 'fixtures'),
  source: 'content'
}
test('', async () => {
  const cb = jest.fn((_err, data) => {
    expect(data).toEqual([
      {
        filePath: 'page/about-okmarvin.md',
        content: 'this is content',
        date: expect.any(Date),
        title: 'about okmarvin',
        excerpt: '',
        isEmpty: false,
        stats: {
          ctimeMs: expect.any(Number)
        }
      },
      {
        filePath: 'post/hello-okmarvin.md',
        content: '\nthis is content',
        date: expect.any(Date),
        title: 'hello okmarvin',
        excerpt: '',
        isEmpty: false,
        stats: {
          ctimeMs: expect.any(Number)
        }
      }
    ])
  })
  await readFiles(conn, cb)
})
