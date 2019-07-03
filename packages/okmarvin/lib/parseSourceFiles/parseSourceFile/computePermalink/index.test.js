const fn = require('./index')
test('returns permalink', () => {
  const data = fn('/:month/:title', {
    categories: [],
    title: 'okmarvin',
    datePublished: new Date('2010-10-10'),
    filePath: '_pages/hello'
  })
  expect(data).toBe('/10/okmarvin/')
  expect(data).toMatchSnapshot()
})
test('', () => {
  const data = fn('/:dir/:filename', {
    datePublished: new Date('2010-10-10'),
    filePath: '_pages/blog.md'
  })
  expect(data).toBe('/blog/')
})
