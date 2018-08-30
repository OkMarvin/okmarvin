const computeSiteConfig = require('./computeSiteConfig')
const defaultSiteConfig = require('./defaultSiteConfig')
test('should return default site config', () => {
  const mockCallback = jest.fn()
  computeSiteConfig('', mockCallback)
  expect(mockCallback).toBeCalled()
  expect(mockCallback.mock.calls.length).toBe(1)
  expect(mockCallback).toBeCalledWith(null, defaultSiteConfig)
})
it('should return title = hi sam', () => {
  const cb = jest.fn()
  computeSiteConfig('title = "hi sam"', cb)
  expect(cb).toBeCalledWith(null, { ...defaultSiteConfig, title: 'hi sam' })
})
test('should throw error', () => {
  const mockCallback = jest.fn()
  expect(() =>
    computeSiteConfig(`title: OkMarvin\nauthor`, mockCallback)
  ).toThrow()
  expect(mockCallback).not.toBeCalled()
})
