import getPaginationList from './getPaginationList'
it('should return [1]', () => {
  const arr = getPaginationList(1, 1)
  expect(arr).toEqual([1])
})
it('should return [1, 2]', () => {
  expect(getPaginationList(2, 1)).toEqual([1, 2])
})
it('should return [1, 2, 3, 4, 5]', () => {
  expect(getPaginationList(5, 5)).toEqual([1, 2, 3, 4, 5])
})
it('should return all numbers', () => {
  expect(
    getPaginationList(7, 1, 7)
  ).toEqual([1, 2, 3, 4, 5, 6, 7])
})
it('should return [1, 2, 3, 4, ..., 25]', () => {
  expect(
    getPaginationList(25, 1)
  ).toEqual([1, 2, 3, 4, '...', 25])
})
it('should return [1,...,3,4,5,6,...,10]', () => {
  expect(
    getPaginationList(10, 5, 6)
  ).toEqual([1, '...', 3, 4, 5, 6, '...', 10])
})
it('should return [1, ..., 4, 5, 6, ..., 25]', () => {
  expect(
    getPaginationList(25, 5)
  ).toEqual([1, '...', 4, 5, 6, '...', 25])
})
it('should return [1, ..., 22, 23, 24, 25]', () => {
  expect(
    getPaginationList(25, 24)
  ).toEqual([1, '...', 22, 23, 24, 25])
})
it('should return [1, ..., 22, 23, 24, 25]', () => {
  expect(
    getPaginationList(25, 25)
  ).toEqual([1, '...', 22, 23, 24, 25])
})
