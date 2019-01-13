const loadLayouts = require('./loadLayouts')
test('returns default value', () => {
  const cb = jest.fn()
  loadLayouts({ root: __dirname, siteConfig: { layoutHierarchy: {} } }, cb)
  expect(cb).toBeCalledWith(null, {
    root: __dirname,
    siteConfig: { layoutHierarchy: {} },
    layoutHash: [],
    layouts: Object.create(null)
  })
})
test('returns layouts from fixture', done => {
  const cb = jest.fn((_err, data) => {
    expect(data).toMatchSnapshot()
    done()
  })
  loadLayouts(
    {
      root: __dirname,
      siteConfig: { layoutHierarchy: { 'index.js': ['index.js'] } }
    },
    cb
  )
})
