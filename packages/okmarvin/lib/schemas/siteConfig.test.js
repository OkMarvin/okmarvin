const siteConfig = require('./siteConfig')
const { ajv } = require('@okmarvin/helpers')
describe('permalink', () => {
  test('ok', () => {
    expect(
      ajv.validate(siteConfig, {
        menu: [
          {
            text: 'hello world',
            permalink: '/hello-world'
          }
        ]
      })
    )
  })
  test('ok', () => {
    expect(
      ajv.validate(siteConfig, {
        menu: [
          {
            text: 'about',
            permalink: '/hello/world/about'
          }
        ]
      })
    )
  })
})
