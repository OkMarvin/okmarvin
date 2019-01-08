const promiseCatcher = require('./index')
test('returns data', async () => {
  const promise = new Promise((resolve, reject) => {
    resolve(1)
  })
  const [err, data] = await promiseCatcher(promise)
  expect(err).toBeNull()
  expect(data).toBe(1)
})
test('returns err', async () => {
  const error = new Error('err')
  const promise = new Promise((resolve, reject) => {
    reject(error)
  })
  const [err, data] = await promiseCatcher(promise)
  expect(err).toEqual(error)
  expect(data).toBeUndefined()
})
