const slug = require('./slug')
it('returns a-b', () => {
  expect(slug('a b')).toBe('a-b')
  expect(slug('a b')).toBe('a-b')
})
it('returns 中文', () => {
  expect(slug('中文')).toBe('中文')
})
it('returns 中-文', () => {
  expect(slug('中 文')).toBe('中-文')
})
