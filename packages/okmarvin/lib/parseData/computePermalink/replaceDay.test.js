const fn = require('./replaceDay')
test(':day replaced', () => {
  expect(fn('/:day', 15)).toBe('/15')
})
test('all :day replaced', () => {
  expect(fn('/:day/:day', 3)).toBe('/3/3')
})
