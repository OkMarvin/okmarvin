'use strict'

const validation = require('./index')
const conn = {
  files: [
    {
      permalink: '/hello',
      filePath: '_posts/hello.md'
    },
    {
      permalink: '/',
      title: 'home'
    }
  ]
}
test('returns conn', () => {
  expect(validation(conn)).toEqual(conn)
})
test('throws error when duplicate permalinks detected', () => {
  expect(() =>
    validation({
      ...conn,
      files: [
        ...conn.files,
        {
          permalink: '/hello',
          filePath: '_posts/hi.md'
        }
      ]
    })
  ).toThrow()
})
