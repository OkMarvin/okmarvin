const fn = require('./replaceDay')
test(':day replaced', () => {
  expect(fn('/:day', {date: '2017-01-15'})).toBe('/15')
})
test('all :day replaced', () => {
  expect(fn('/:day/:day', {date: '2017-01-03'})).toBe('/3/3')
})
