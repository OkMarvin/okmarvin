const fn = require('./replaceDir')
const path = require('path')
test(':dir replaced', () => {
  expect(fn('/:dir', path.join('_pages/blog/hello'))).toBe('/blog/hello')
})
test(':dir with chinese', () => {
  expect(
    fn('/:dir', path.join('_pages/博客/测试'))
  ).toBe(`/${encodeURIComponent('博客')}/${encodeURIComponent('测试')}`)
})
test(':dir with chinese and whitespace', () => {
  expect(
    fn('/:dir', path.join('_pages/博 客/测试'))
  ).toBe(`/${encodeURIComponent('博-客')}/${encodeURIComponent('测试')}`)
})
