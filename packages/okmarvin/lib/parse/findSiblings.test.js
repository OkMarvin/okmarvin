const findSiblings = require('./findSiblings')
describe('findSiblings', () => {
  it('returns original', () => {
    const cb = jest.fn()
    findSiblings([], cb)
    expect(cb).toBeCalled()
    expect(cb).toBeCalledWith(null, [])
  })
})
