const getInferredTemplate = require('./getInferredTemplate')
test('returns test.js', () => {
  expect(
    getInferredTemplate(
      'test/content/post/hello-okmarvin.md'
    )
  ).toBe('test.js')
})
