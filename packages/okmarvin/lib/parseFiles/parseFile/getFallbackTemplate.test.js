const getFallbackTemplate = require('./getFallbackTemplate')
test('returns test.js', () => {
  expect(
    getFallbackTemplate(
      'test/content/post/hello-okmarvin.md'
    )
  ).toBe('test.js')
})
