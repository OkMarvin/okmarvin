const diffLayout = require('./diffLayout')
test('diffLayout', () => {
  const conn = {
    cache: { layoutHash: [] },
    layoutHash: ['abc'],
    clean: false
  }
  const callback = jest.fn()
  diffLayout(conn, callback)
  expect(callback).toBeCalled()
  expect(callback).toBeCalledWith(null, { ...conn, clean: true })
})
