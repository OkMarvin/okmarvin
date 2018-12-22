const read = require('./index')
test('throws error', () => {
  const callback = jest.fn()
  read(
    {
      root: '/',
      from: 'content',
      to: 'dist',
      builtAt: new Date().getTime()
    },
    callback
  )
  expect(callback).toBeCalledWith(
    new Error(
      `Oops, nothing I can do because "content" folder does not exist :(`
    )
  )
})
