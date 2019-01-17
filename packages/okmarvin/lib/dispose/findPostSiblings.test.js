const findPostSiblings = require('./findPostSiblings')
describe('findPostSiblings', () => {
  it('returns original', () => {
    const cb = jest.fn()
    findPostSiblings({ files: [] }, cb)
    expect(cb).toBeCalled()
    expect(cb).toBeCalledWith(null, { files: [] })
  })
})
