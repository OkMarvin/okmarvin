const findRelated = require('./findRelated')
it('should call callback', () => {
  const cb = jest.fn()
  findRelated({ files: [], tags: {} }, cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, { files: [], tags: {} })
})
