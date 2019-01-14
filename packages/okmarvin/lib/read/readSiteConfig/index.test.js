const path = require('path')
const readSiteConfig = require('./index')
test('readSiteConfig', async () => {
  const conn = {
    root: path.join(__dirname, '..', 'fixtures')
  }
  const cb = jest.fn((_err, data) => {
    expect(data).toMatchSnapshot()
  })
  await readSiteConfig(conn, cb)
})
