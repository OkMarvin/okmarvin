'use strict'
const createArticle = require('./createArticle')
describe('createArticle', () => {
  it('should warn when no title', () => {
    expect(
      () => createArticle('post')
    ).toThrow()
  })
  it('should pass', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'development'
    })
    expect(
      () => createArticle('post', 'okmarvin is static site generator')
    ).not.toThrow()
  })
})
