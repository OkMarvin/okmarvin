const configStore = require('@okmarvin/okmarvin/lib/configStore')
describe('configStore', () => {
  it('should set a key with value', () => {
    configStore.add('key', 1)
    expect(configStore.get('key')).toBe(1)
  })
  it('should read the key', () => {
    expect(configStore.get('nothing')).toBeUndefined()
  })
  it('should override the configStore', () => {
    configStore.add({ name: 'sam', age: 100 })
    expect(configStore.get('name')).toBe('sam')
    expect(configStore.get('age')).toBe(100)
  })
  describe('', () => {
    beforeAll(() => {
      configStore.clear()
    })
    it('should just return the whole configStore', () => {
      expect(configStore.get()).toEqual({})
    })
  })
})
