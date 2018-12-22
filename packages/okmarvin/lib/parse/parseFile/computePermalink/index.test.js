const fn = require('./index')
test('returns permalink', () => {
  const data = fn(
    '/:month/:title',
    { categories: [], title: 'okmarvin' },
    new Date('2010-10-10'),
    'content/page/hello'
  )
  expect(data).toBe('/10/okmarvin/')
  expect(data).toMatchSnapshot()
})
