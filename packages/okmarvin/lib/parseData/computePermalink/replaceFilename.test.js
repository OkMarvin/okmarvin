const fn = require('./replaceFilename')
test(':filename replaced', () => {
  expect(fn('/:filename', 'index')).toBe('/')
})
test(':filename with chinese', () => {
  expect(fn('/:filename', '教程')).toBe('/' + encodeURIComponent('教程'))
})
test(':filename with chinese and whitespace', () => {
  expect(fn('/:filename', '教 程')).toBe('/' + encodeURIComponent('教-程'))
})
