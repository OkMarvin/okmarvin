const fn = require('./index')
test('returns permalink', () => {
  expect(
    fn({ permalink: '/:month/:title' }, { permalink: '/hello-:title', title: 'okmarvin' })
  ).toBe('/hello-okmarvin/')
})
