const getFallbackTemplate = require('./getFallbackTemplate')
const path = require('path')
test('returns test.js', () => {
  expect(
    getFallbackTemplate(
      __dirname,
      'content',
      path.join(__dirname, 'content', 'test/content/post/hello-okmarvin.md')
    )
  ).toBe('test.js')
})
test('returns test.js', () => {
  expect(
    getFallbackTemplate(
      path.join(__dirname, 'content', 'hello', 'content'),
      'content',
      path.join(
        path.join(__dirname, 'content', 'hello', 'content'),
        'content',
        'test/content/post/hello-okmarvin.md'
      )
    )
  ).toBe('test.js')
})
