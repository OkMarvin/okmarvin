const path = require('path')
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
test('returns data', done => {
  const callback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toHaveProperty('okmarvinConfig')
    expect(data).toHaveProperty('siteConfig')
    expect(data).toHaveProperty('files')
    expect(data).toHaveProperty('from', 'content')
    expect(data).toHaveProperty('to', 'dist')
    done()
  }
  read(
    {
      root: path.join(__dirname, 'fixtures'),
      from: 'content',
      to: 'dist',
      builtAt: new Date().getTime()
    },
    callback
  )
})
