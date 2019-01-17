const fn = require('./replaceYear')
test(':year replaced', () => {
  expect(fn('/:year', '2017')).toBe('/2017')
})
test('all :year replaced', () => {
  expect(fn('/:year/:year', '2017')).toBe('/2017/2017')
})
