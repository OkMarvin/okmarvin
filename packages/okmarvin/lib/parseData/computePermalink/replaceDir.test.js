const fn = require('./replaceDir')
test(':dir replaced', () => {
  expect(fn('/:dir', 'content/page/blog/hello')).toBe('/blog/hello')
})
