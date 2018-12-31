const findRelatedPostsByTags = require('./findRelatedPostsByTags')
it('should call callback', () => {
  const cb = jest.fn()
  findRelatedPostsByTags({ files: [], tags: {} }, cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, { files: [], tags: {} })
})
