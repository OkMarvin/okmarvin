const path = require('path')
const promiseUserSiteConfig = require('./promiseUserSiteConfig')
test('returns site configuration object', () => {
  return promiseUserSiteConfig(
    path.join(__dirname, 'fixtures', '_config.toml')
  ).then(data => {
    expect(data).toEqual({
      title: '陈三',
      lang: 'zh',
      description: '记录人、事与代码',
      author: '陈三',
      url: 'https://blog.zfanw.com',
      theme: './themes/hello'
    })
    expect(data).toMatchSnapshot()
  })
})
test('throws', () => {
  const catcher = jest.fn()
  return promiseUserSiteConfig(
    path.join(__dirname, 'fixtures', '_config.toml.x')
  )
    .catch(catcher)
    .then(() => expect(catcher).toBeCalled())
})
