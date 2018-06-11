const fn = require('./replaceCategory')
test('replaces category', () => {
  expect(
    fn('/:categories', {categories: ['foo', 'bar']})
  ).toBe('/foo/bar')
})
test(':categories with chinese', () => {
  expect(
    fn('/:categories', {categories: ['教程', 'react']})
  ).toBe(`/${encodeURIComponent('教程')}/react`)
})
test(':categories with chinese and whitespace', () => {
  expect(
    fn('/:categories', {categories: ['教 程', 'react']})
  ).toBe(`/${encodeURIComponent('教-程')}/react`)
})
