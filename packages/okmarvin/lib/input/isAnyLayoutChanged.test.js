const isAnyLayoutChanged = require('./isAnyLayoutChanged')
test('isAnyLayoutChanged', () => {
  const conn = {
    cache: { layoutHash: [] },
    layoutHash: ['abc'],
    clean: false
  }
  const callback = jest.fn()
  isAnyLayoutChanged(conn, callback)
  expect(callback).toBeCalled()
  expect(callback).toBeCalledWith(null, true)
})
