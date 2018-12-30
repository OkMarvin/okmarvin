const findSiblings = require('./findSiblings')
describe('findSiblings', () => {
  it('returns original', () => {
    const cb = jest.fn()
    findSiblings({ files: [] }, cb)
    expect(cb).toBeCalled()
    expect(cb).toBeCalledWith(null, { files: [] })
  })
})
