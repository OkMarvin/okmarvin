const fn = require('./index')
test('returns permalink', () => {
  expect(
    fn(
      '/:month/:title',
      { categories: [], title: 'okmarvin' },
      new Date('2010-10-10'),
      'content/page/hello'
    )
  ).toBe('/10/okmarvin/')
})
