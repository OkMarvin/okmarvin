const fn = require('./normalizePermalink')
it('should append /', () => {
  expect(fn('/hi')).toBe('/hi/')
})
it('should not append /', () => {
  expect(fn('/hi/')).toBe('/hi/')
})
