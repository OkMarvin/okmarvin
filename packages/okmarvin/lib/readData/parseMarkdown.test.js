const parseMarkdown = require('./parseMarkdown')
const matter = require('gray-matter')
describe('parseMarkdown', () => {
  const result = { data: { title: 'hello okmarvin' }, content: '' }
  beforeAll(() => {
    matter.__setResult(result)
  })
  it('should return object containing data', () => {
    expect(parseMarkdown('')).toEqual(result)
  })
})
