const fn = require('./replaceTitle')
test(':title replaced', () => {
  expect(fn('/:title', 'okmarvin')).toBe('/okmarvin')
})
test('returns original str', () => {
  expect(fn('/okmarvin', 'hello')).toBe('/okmarvin')
})
test('replaces all :title', () => {
  expect(fn('/:title/:title', 'okmarvin')).toBe('/okmarvin/okmarvin')
})
test('replaces all :title', () => {
  expect(fn('/:title/:title')).toBe('//')
})
test('replaces :title with Chinese text', () => {
  expect(fn('/:title/', '你好')).toBe('/%E4%BD%A0%E5%A5%BD/')
})
