const loadLayouts = require('./loadLayouts')
test('returns default value', () => {
  const cb = jest.fn()
  loadLayouts({ root: __dirname, site: { layoutHierarchy: {} } }, cb)
  expect(cb).toBeCalledWith(null, {
    layoutHash: [],
    layouts: Object.create(null)
  })
})
