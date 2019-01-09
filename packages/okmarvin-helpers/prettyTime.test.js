const prettyTime = require('./prettyTime')
test('returns ms', () => {
  expect(prettyTime(61)).toBe('61ms')
})
test('returns sec', () => {
  expect(prettyTime(1001)).toBe('1.00s')
})
