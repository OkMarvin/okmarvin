const readLayouts = require('./readLayouts')
test('returns default value', async () => {
  const data = await readLayouts(__dirname, {})
  expect(data).toEqual({ layoutHash: [], layouts: Object.create(null) })
})
test('returns layouts from fixture', async () => {
  const data = await readLayouts(__dirname, {
    'index.js': ['index.js']
  })
  expect(data).toMatchSnapshot()
})
