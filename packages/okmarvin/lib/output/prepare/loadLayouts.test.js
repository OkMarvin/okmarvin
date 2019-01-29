const loadLayouts = require('./loadLayouts')
test('returns default value', () => {
  const cb = jest.fn()
  loadLayouts({ root: __dirname, site: { layoutHierarchy: {} } }, cb)
  expect(cb).toBeCalledWith(null, {
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
      site: { layoutHierarchy: { 'index.js': ['index.js'] } }
    },
    cb
  )
})
