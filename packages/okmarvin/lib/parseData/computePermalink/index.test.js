const fn = require('./index')
test('returns permalink', () => {
  expect(
    fn(
      { permalink: '/:month/:title' },
      { permalink: '/hello-:title', title: 'okmarvin' },
      new Date(),
      'content/page/hello'
    )
  ).toBe('/hello-okmarvin/')
})
