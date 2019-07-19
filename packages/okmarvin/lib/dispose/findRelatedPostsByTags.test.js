'use strict'
const findRelatedPostsByTags = require('./findRelatedPostsByTags')
it('should call callback', () => {
  expect(findRelatedPostsByTags({ files: [], site: { tags: {} } })).toEqual({
    files: [],
    site: { tags: {} }
  })
})
