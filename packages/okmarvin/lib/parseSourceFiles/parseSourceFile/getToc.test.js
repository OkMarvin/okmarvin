const getToc = require('./getToc')
test('returns toc', () => {
  expect(getToc(false, false)).toBe(false)
  expect(getToc(true, false)).toBe(true)
  expect(getToc(true, false)).toBe(true)
  expect(getToc(false, true)).toBe(false)
})
test('returns default toc', () => {
  expect(getToc(undefined, false)).toBe(false)
  expect(getToc(undefined, true)).toBe(true)
})
