const path = require('path')
const readFiles = require('./index')
const conn = {
  root: path.join(__dirname, '..', 'fixtures')
}
test('Returns all .md files', async () => {
  const cb = jest.fn((_err, data) => {
    expect(data).toEqual([
      {
        filePath: '_pages/about-okmarvin.md',
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
        filePath: '_posts/hello-okmarvin.md',
        content: 'this is content',
        date: expect.any(Date),
        title: 'hello okmarvin',
        excerpt: '',
        isEmpty: false,
        stats: {
          ctimeMs: expect.any(Number)
        }
      },
      {
        filePath: '_posts/why-okmarvin/index.md',
        content: 'this is content',
        date: expect.any(Date),
        title: 'why okmarvin',
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
