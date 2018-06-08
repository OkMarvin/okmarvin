import fn from './findBegin'
it('returns 1', () => {
  expect(fn(5, 5)).toBe(1)
})
it('returns 1 again', () => {
  expect(fn(11, 3)).toBe(1)
})
it('returns 5', () => {
  expect(fn(100, 10)).toBe(5)
})
it('returns 2', () => {
  expect(fn(12, 10)).toBe(2)
})
