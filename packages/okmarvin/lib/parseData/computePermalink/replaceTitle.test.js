const fn = require('./replaceTitle')
test(':title replaced', () => {
  expect(fn('/:title', {title: 'okmarvin'})).toBe('/okmarvin')
})
test('returns original str', () => {
  expect(fn('/okmarvin', {title: 'hello'})).toBe('/okmarvin')
})
test('replaces all :title', () => {
  expect(fn('/:title/:title', {title: 'okmarvin'})).toBe('/okmarvin/okmarvin')
})
