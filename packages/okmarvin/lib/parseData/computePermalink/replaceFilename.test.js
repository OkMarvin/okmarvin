const fn = require('./replaceFilename')
test(':filename replaced', () => {
  expect(fn('/:filename/hey', 'index')).toBe('//hey')
})
