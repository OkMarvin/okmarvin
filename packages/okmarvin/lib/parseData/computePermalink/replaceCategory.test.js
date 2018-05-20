const fn = require('./replaceCategory')
test('replaces category', () => {
  expect(
    fn('/:category', {categories: ['foo', 'bar']})
  ).toBe('/foo/bar')
})
