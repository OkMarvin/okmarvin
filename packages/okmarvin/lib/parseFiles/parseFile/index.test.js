const parseFile = require('./index')
const defaultConn = {
  themeManifest: {
    'post.js': ''
  },
  siteConfig: {
    toc: false
  }
}
const defaultFile = {
  title: 'ok marvin',
  permalink: '/hello-marvin',
  filePath: 'post/hello marvin/index.md'
}
test('do not return toc because we will not need it', () => {
  const conn = { ...defaultConn }
  const file = { ...defaultFile }
  const cb = jest.fn((_err, file) => {
    expect(file.toc).toBeUndefined()
  })
  parseFile(conn, file, cb)
})
test('returns author from site config', () => {
  const conn = {
    ...defaultConn,
    siteConfig: {
      toc: false,
      author: 'Sam Chen'
    }
  }
  const cb = jest.fn((_err, file) => {
    expect(file.author).toBe('Sam Chen')
  })
  parseFile(conn, defaultFile, cb)
})
test('returns author from file front matter', () => {
  const file = { ...defaultFile, author: 'samchen' }
  const cb = jest.fn((_err, file) => {
    expect(file.author).toBe('samchen')
  })
  parseFile(defaultConn, file, cb)
})
test('returns description from front matter', () => {
  const file = { ...defaultFile, description: 'okmarvin is another static site generator', excerpt: 'nonono' }
  const cb = jest.fn((_err, file) => {
    expect(file.description).toBe('okmarvin is another static site generator')
  })
  parseFile(defaultConn, file, cb)
})
test('returns description from excerpt', () => {
  const file = { ...defaultFile, description: '', excerpt: 'nonono' }
  const cb = jest.fn((_err, file) => {
    expect(file.description).toBe('nonono')
  })
  parseFile(defaultConn, file, cb)
})
test('returns datePublished and dateModified', () => {
  const file = { ...defaultFile, date: '2018-10-01' }
  const cb = jest.fn((_err, file) => {
    expect(file.datePublished).toBe(new Date('2018-10-01').getTime())
    expect(file.dateModified).toBe(new Date('2018-10-01').getTime())
  })
  parseFile(defaultConn, file, cb)
})
test('returns dateModified', () => {
  const file = { ...defaultFile, dateModified: '2018-09-01' }
  const cb = jest.fn((_err, file) => {
    expect(file.dateModified).toBe(new Date('2018-09-01').getTime())
  })
  parseFile(defaultConn, file, cb)
})
test('returns template', () => {
  const cb = jest.fn((_err, file) => {
    expect(file.template).toBe('something')
  })
  const file = { ...defaultFile, template: 'something' }
  parseFile(defaultConn, file, cb)
})
