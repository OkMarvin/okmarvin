const path = require('path')
const readFiles = require('./index')
const conn = {
  root: path.join(__dirname, '..', 'fixtures')
}
test('', async () => {
  const cb = jest.fn((_err, data) => {
    expect(data).toEqual({
      files: [
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
      ],
      fileAssets: [
        '_posts/why-okmarvin/a.txt',
        '_posts/why-okmarvin/dir/b.txt',
        '_posts/why-okmarvin/dir/c/e.txt'
      ]
    })
  })
  await readFiles(conn, cb)
})
