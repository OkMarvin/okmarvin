const fn = require('./computeTemplate')
test('returns post', () => {
  expect(fn({ 'post.js': 'a.js' }, 'post.js', '')).toBe('post.js')
})
test('returns page', () => {
  expect(
    fn({ 'page.js': 'page.p.js' }, null, 'content', '/content/page/intro.md')
  ).toBe('page.js')
})
