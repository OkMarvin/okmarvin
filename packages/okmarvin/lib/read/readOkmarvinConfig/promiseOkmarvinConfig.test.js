const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
const path = require('path')
test('returns {} when configuration file does not exist', () => {
  promiseOkmarvinConfig(path.join(__dirname, '..', 'fixtures', 'not-exist')).then(
    data => {
      expect(data).toEqual({})
    }
  )
})
test('returns module content when configuration file do exist', () => {
  promiseOkmarvinConfig(path.join(__dirname, '..', 'fixtures')).then(data => {
    expect(data).toEqual({
      markdown: {
        toc: {
          title: '目录'
        },
        loadLanguages: ['bash', 'elixir']
      }
    })
    expect(data).toMatchSnapshot()
  })
})
