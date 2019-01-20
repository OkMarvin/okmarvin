const getInferredTemplate = require('./getInferredTemplate')
test('returns post.js', () => {
  expect(
    getInferredTemplate(
      '_posts/hello-okmarvin.md'
    )
  ).toBe('post.js')
})
