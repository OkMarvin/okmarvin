const prepare = require('./prepare')
const { join } = require('path')
test('', (done) => {
  const cb = function (err, data) {
    expect(err).toBeNull()
    expect(data).toHaveProperty('clientJsManifest')
    expect(data).toHaveProperty('layoutHash')
    expect(data).toHaveProperty('layouts')
    expect(data).toHaveProperty('themeManifest')
    expect(data).toHaveProperty('cache')
    expect(data).toHaveProperty('okmarvinConfig')
    expect(data).toHaveProperty('siteConfig')
    expect(data).toHaveProperty('files')
    done()
  }
  prepare(
    { root: join(__dirname, 'fixtures'), source: 'content', devHook: false },
    cb
  )
})
