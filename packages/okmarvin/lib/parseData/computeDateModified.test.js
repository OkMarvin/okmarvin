const fn = require('./computeDateModified')
// 2017-01-01
const year2017 = 1483228800000
const year2018 = 1514764800000
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
test('returns dateModified value', () => {
  expect(
    fn({dateModified: '2018-01-01', date: '2017-01-01'})
  ).toBe(year2018)
})
