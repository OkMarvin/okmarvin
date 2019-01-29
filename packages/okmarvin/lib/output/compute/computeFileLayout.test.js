'use strict'

const conn = {
  layouts: {},
  site: {
    layoutHierarchy: {
      'hello.js': ['singular.js', 'index.js']
    }
  },
  files: [
    {
      layout: 'hi.js',
      template: 'hello.js',
      filePath: '_posts/hi.md'
    }
  ]
}
const computeFileLayout = require('./computeFileLayout')
test('throws error when layout not found', () => {
  expect(() => computeFileLayout(conn)).toThrowError(
    `hi.js defined in _posts/hi.md not found under _layouts directory`
  )
  expect(() =>
    computeFileLayout({
      ...conn,
      files: [{ template: 'hello.js', filePath: '_posts/hello.md' }]
    })
  ).toThrowError(
    `No layouts found under _layouts directory for _posts/hello.md`
  )
})
test('sets layout', () => {
  expect(computeFileLayout({ ...conn, layouts: { 'hi.js': 'hello' } })).toEqual(
    {
      ...conn,
      layouts: {
        'hi.js': 'hello'
      },
      files: [
        {
          layout: 'hello',
          template: 'hello.js',
          filePath: '_posts/hi.md'
        }
      ]
    }
  )
  expect(
    computeFileLayout({
      ...conn,
      layouts: { 'index.js': 'om' },
      files: [
        {
          template: 'hello.js',
          filePath: '_posts/hi.md'
        }
      ]
    })
  ).toEqual({
    ...conn,
    layouts: {
      'index.js': 'om'
    },
    files: [
      {
        layout: 'om',
        template: 'hello.js',
        filePath: '_posts/hi.md'
      }
    ]
  })
})
