const fn = require('./replaceYear')
test(':year replaced', () => {
  expect(fn('/:year', {date: '2017-01-01'})).toBe('/2017')
})
test('all :year replaced', () => {
  expect(fn('/:year/:year', {date: '2017-01-01'})).toBe('/2017/2017')
})
