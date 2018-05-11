const loadSiteConfig = require('./loadSiteConfig')
const defaultSiteConfig = require('./defaultSiteConfig')
test('should load default site config', () => {
  const mockCallback = jest.fn()
  loadSiteConfig(__dirname, mockCallback)
  expect(mockCallback).toBeCalled()
  expect(mockCallback.mock.calls.length).toBe(1)
  expect(mockCallback).toBeCalledWith(null, defaultSiteConfig)
})
