const buildSite = require('./buildSite')
describe('buildSite', () => {
  it('should run callback', () => {
    const mock = jest.fn()
    buildSite({flags: {}}, mock)
    expect(mock).toBeCalled()
    expect(mock).toBeCalledWith()
  })
})
