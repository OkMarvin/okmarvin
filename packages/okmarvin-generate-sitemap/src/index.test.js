const generateFeed = require('./index')
test('renders correctly', () => {
  expect(
    generateFeed({
      site: {
        title: 'hello okmarvin',
        description:
          'okmarvin is a static site generator with better theme support',
        url: '/'
      },
      files: []
    })
  ).toMatchSnapshot()
})
