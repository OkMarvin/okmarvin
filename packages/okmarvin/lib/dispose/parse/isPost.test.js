const isPost = require('./isPost')
describe('isPost', () => {
  it('should return true when it has template post.js', () => {
    expect(isPost({ template: 'post.js' })).toBe(true)
  })
  it('should return false when it has template other than post.js', () => {
    expect(isPost({ template: 'page.js' })).toBe(false)
  })
})
