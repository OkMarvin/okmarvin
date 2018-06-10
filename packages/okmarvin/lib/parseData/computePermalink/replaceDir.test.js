const fn = require('./replaceDir')
test(':dir replaced', () => {
  expect(fn('/:dir', 'page/blog/hello')).toBe('/blog/hello')
})
