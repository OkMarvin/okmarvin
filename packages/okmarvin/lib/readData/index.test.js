const readData = require('./index')
const fse = require('fs-extra')
jest.mock('./readUserSiteConfig')
jest.mock('./readThemeManifest')
jest.mock('../configStore')
const defaultSiteconfig = require('./defaultSiteConfig')
describe('readData', () => {
  describe('throw when source path not exist', () => {
    beforeAll(() => {
      fse.__setPathExists(false)
    })
    it('should readData', () => {
      const cb = jest.fn()
      expect(() => {
        readData(cb)
      }).toThrowError('err')
    })
  })
  describe('called with object when source path exists', () => {
    beforeAll(() => {
      fse.__setPathExists(true)
    })
    it('should readData', () => {
      const cb = jest.fn(() =>
        expect(cb).toBeCalledWith(null, {
          config: undefined,
          siteConfig: {
            ...defaultSiteconfig,
            themeManifest: {}
          },
          files: [],
          now: expect.any(Number)
        })
      )
      readData(cb)
    })
  })
})
