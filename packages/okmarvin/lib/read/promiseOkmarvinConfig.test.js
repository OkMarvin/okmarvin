const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
test('returns {} when configuration file does not exist', () => {
  promiseOkmarvinConfig('/not-exist').then(data => {
    expect(data).toEqual({})
  })
})
