const site = require('./site')
const { ajv } = require('@okmarvin/helpers')
describe('permalink', () => {
  test('ok', () => {
    expect(
      ajv.validate(site, {
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
      ajv.validate(site, {
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
