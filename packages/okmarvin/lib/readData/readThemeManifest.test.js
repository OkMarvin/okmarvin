const readThemeManifest = require('./readThemeManifest')
const fse = require('fs-extra')
// sadly we can't mock require.resolve
// so this test is muted
require.resolve = jest.fn()
xdescribe('readThemeManifest', () => {
  const siteConfig = { theme: '@okmarvin/january' }
  describe('failed to read theme manifest file', () => {
    beforeAll(() => {
      fse.__setReadFileErr(new Error('wtf'))
    })
    it('throws error', () => {
      const cb = jest.fn(() => expect(cb).toBeCalledWith(new Error('wtf')))
      readThemeManifest(siteConfig, cb)
    })
  })
  describe('read json string from theme manifest', () => {
    beforeAll(() => {
      fse.__setReadFileErr(null)
      fse.__setReadFileContent('{"abc.js": "bcd.js"}')
    })
    it('returns siteConfig with themeManifest', () => {
      const cb = jest.fn(() => expect(cb).toBeCalledWith(null, {
        ...siteConfig,
        themeManifest: {
          'abc.js': 'bcd.js'
        }
      }))
      readThemeManifest(siteConfig, cb)
    })
  })
})
