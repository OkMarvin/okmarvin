const fn = require('./replaceCategory')
test('replaces category', () => {
  expect(fn('/:categories', ['foo', 'bar'])).toBe('/bar/foo')
})
test(':categories with chinese', () => {
  expect(fn('/:categories', ['教程', 'react'])).toBe(
    `/react/${encodeURIComponent('教程')}`
  )
})
test(':categories with chinese and whitespace', () => {
  expect(fn('/:categories', ['教 程', 'react'])).toBe(
    `/react/${encodeURIComponent('教-程')}`
  )
})
