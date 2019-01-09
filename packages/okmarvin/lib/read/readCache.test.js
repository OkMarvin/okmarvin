const readCache = require('./readCache')
const { resolve } = require('path')
test('returns default cache when _cache.json not exist', () => {
  const cb = jest.fn()
  readCache({ root: resolve(__dirname, 'non-exist') }, cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, {
    themeManifest: Object.create(null),
    clientJsManifest: Object.create(null),
    files: [],
    layoutHash: [],
    okmarvinConfig: Object.create(null),
    siteConfig: Object.create(null)
  })
})
