const fn = require('./replaceDir')
test(':dir replaced', () => {
  expect(fn('/:dir', 'page/blog/hello')).toBe('/blog/hello')
})
test(':dir with chinese', () => {
  expect(
    fn('/:dir', 'page/博客/测试')
  ).toBe(`/${encodeURIComponent('博客')}/${encodeURIComponent('测试')}`)
})
test(':dir with chinese and whitespace', () => {
  expect(
    fn('/:dir', 'page/博 客/测试')
  ).toBe(`/${encodeURIComponent('博-客')}/${encodeURIComponent('测试')}`)
})
