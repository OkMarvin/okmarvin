const fn = require('./replaceMonth')
test(':month replaced', () => {
  expect(fn('/:month', {date: '2017-01-01'})).toBe('/1')
})
test('all :month replaced', () => {
  expect(fn('/:month/:month', {date: '2017-01-01'})).toBe('/1/1')
})
