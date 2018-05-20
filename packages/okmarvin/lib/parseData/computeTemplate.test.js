const fn = require('./computeTemplate')
test('returns post', () => {
  expect(
    fn({'post.js': 'a.js'}, {template: 'post'}, '')
  ).toBe('a.js')
})
test('returns page', () => {
  expect(
    fn({'page.js': 'page.p.js'}, {}, '/content/page/intro.md')
  ).toBe('page.p.js')
})
