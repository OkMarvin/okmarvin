const path = require('path')
const read = require('./index')
test('returns data', done => {
  const callback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toHaveProperty('okmarvinConfig')
    expect(data).toHaveProperty('siteConfig')
    expect(data).toHaveProperty('cache')
    expect(data).toHaveProperty('files')
    expect(data.files).toHaveLength(2)
    expect(data).toHaveProperty('source', 'content')
    expect(data).toHaveProperty('dest', 'dist')
    done()
  }
  read(
    {
      root: path.join(__dirname, 'fixtures'),
      source: 'content',
      dest: 'dist',
      builtAt: new Date().getTime()
    },
    callback
  )
})
