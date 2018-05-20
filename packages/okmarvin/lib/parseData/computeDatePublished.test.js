const fn = require('./computeDatePublished')
// 2017-01-01
const year2017 = 1483228800000
test('returns date from data', () => {
  expect(
    fn({date: '2017-01-01'})
  ).toBe(year2017)
})
test('returns current date', () => {
  expect(
    fn({})
  ).toBeGreaterThan(year2017)
})
