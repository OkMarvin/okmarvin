const fn = require('./computeDescription')
test('returns description from data', () => {
  expect(fn({ description: 'hello okmarvin' }, '')).toBe('hello okmarvin')
})
test('returns description from content', () => {
  expect(fn({}, 's'.repeat(230) + 'more')).toBe('s'.repeat(230))
})
