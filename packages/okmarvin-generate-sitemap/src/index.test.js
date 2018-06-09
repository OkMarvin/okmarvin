const generateFeed = require('./index')
test('renders correctly', () => {
  expect(
    generateFeed({
      site: {
        title: 'hello okmarvin',
        description:
          'okmarvin is a static site generator with better theme developer experience',
        url: '/'
      },
      files: []
    })
  ).toMatchSnapshot()
})
