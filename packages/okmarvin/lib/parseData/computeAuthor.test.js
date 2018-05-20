const fn = require('./computeAuthor')
test('returns author from data', () => {
  expect(fn({ author: 'Sam Chen' }, { author: 'Sam' })).toBe('Sam')
})
test('returns author from siteConfig', () => {
  expect(fn({ author: 'Sam Chen' }, {})).toBe('Sam Chen')
})
