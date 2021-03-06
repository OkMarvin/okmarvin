'use strict'
const readOkmarvinConfig = require('.')
const { join } = require('path')
test('returns default when no .okmarvin.js exist', async () => {
  const cb = jest.fn()
  await readOkmarvinConfig({ root: __dirname }, cb)
  expect(cb).toBeCalledWith(
    null,
    {
      markdown: {
        toc: {},
        loadLanguages: []
      }
    }
  )
})
test('returns content from .okmarvin.js', async () => {
  const cb = jest.fn()
  await readOkmarvinConfig({ root: join(__dirname, '..', 'fixtures') }, cb)
  expect(cb).toBeCalledWith(null, {
    markdown: {
      toc: {
        title: '目录'
      },
      loadLanguages: ['bash', 'elixir']
    }
  })
})
