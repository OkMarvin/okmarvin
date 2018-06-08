const generateFeed = require('./index')
test('renders correctly', () => {
  expect(generateFeed({siteConfig: {
    title: 'hello okmarvin',
    description: 'okmarvin is a static site generator with better theme support',
    url: '/'
  },
  files: []})).toBeTruthy()
})
