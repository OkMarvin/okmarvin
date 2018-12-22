const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
test('returns {} when configuration file does not exist', () => {
  promiseOkmarvinConfig('/not-exist').then(data => {
    expect(data).toEqual({})
  })
})
test('returns module content when configuration file do exist', () => {
  // how to mock file system
  // but why? why should I test it
})
