const readThemeManifest = require('./readThemeManifest')
const fse = require('fs-extra')
describe('readThemeManifest', () => {
  const siteConfig = { theme: '@okmarvin/january' }
  describe('failed to read theme manifest file', () => {
    beforeAll(() => {
      fse.__setReadFileErr(new Error('wtf'))
      fse.__setReadFileContent('{}')
    })
    it('throws error', () => {
      const cb = jest.fn()
      readThemeManifest(siteConfig, cb)
      expect(cb).toBeCalled()
      expect(cb).toBeCalledWith(new Error('wtf'))
    })
  })
  describe('read json string from theme manifest', () => {
    beforeAll(() => {
      fse.__setReadFileErr(null)
      fse.__setReadFileContent('{"abc.js": "bcd.js"}')
    })
    it('returns object with themeManifest', () => {
      const cb = jest.fn()
      readThemeManifest(siteConfig, cb)
      expect(cb).toBeCalled()
      expect(cb).toBeCalledWith(null, {
        ...siteConfig,
        themeManifest: {
          'abc.js': 'bcd.js'
        }
      })
    })
  })
})
