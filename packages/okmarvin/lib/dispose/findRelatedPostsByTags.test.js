'use strict'
const findRelatedPostsByTags = require('./findRelatedPostsByTags')
it('should call callback', () => {
  expect(findRelatedPostsByTags({ files: [], tags: {} })).toEqual({
    files: [],
    tags: {}
  })
})
