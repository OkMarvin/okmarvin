const fn = require('./computeToc')
test('returns true', () => {
  expect(fn({ toc: false }, { toc: true })).toBe(true)
})
test('returns false', () => {
  expect(fn({}, { toc: false })).toBe(false)
})
