const fn = require('./replaceMonth')
test(':month replaced', () => {
  expect(fn('/:month', '1')).toBe('/1')
})
test('all :month replaced', () => {
  expect(fn('/:month/:month', 1)).toBe('/1/1')
})
