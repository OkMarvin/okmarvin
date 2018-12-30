const path = require('path')
const read = require('./index')
test('returns data', done => {
  const callback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toHaveProperty('okmarvinConfig')
    expect(data).toHaveProperty('siteConfig')
    expect(data).toHaveProperty('cache')
    expect(data).toHaveProperty('layouts')
    expect(data).toHaveProperty('layoutHash')
    expect(data).toHaveProperty('files')
    expect(data.files).toHaveLength(2)
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
