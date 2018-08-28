const readData = require('./index')
const fse = require('fs-extra')
jest.mock('./readUserSiteConfig')
jest.mock('./readThemeManifest')
const defaultSiteconfig = require('./defaultSiteConfig')
describe('readData', () => {
  describe('source path not exist', () => {
    beforeAll(() => {
      fse.__setPathExists(false)
    })
    it('should readData', () => {
      const cb = jest.fn()
      expect(() => {
        readData(__dirname, 'src', 'dist', cb)
      }).toThrowError('err')
    })
  })
  describe('source path exists', () => {
    beforeAll(() => {
      fse.__setPathExists(true)
    })
    it('should readData', () => {
      const cb = jest.fn(() =>
        expect(cb).toBeCalledWith(null, {
          config: {},
          siteConfig: {
            ...defaultSiteconfig,
            themeManifest: {}
          },
          files: [],
          cwd: __dirname,
          source: 'src',
          destination: 'dist',
          now: expect.any(Number)
        })
      )
      readData(__dirname, 'src', 'dist', cb)
    })
  })
})
