'use strict'

const findPostSiblings = require('./findPostSiblings')
describe('findPostSiblings', () => {
  it('returns original', () => {
    expect(findPostSiblings({ files: [] })).toEqual({ files: [] })
  })
})
