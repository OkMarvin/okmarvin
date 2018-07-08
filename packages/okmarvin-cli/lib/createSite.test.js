'use strict'
const createSite = require('./createSite')
const path = require('path')
const fse = require('fs-extra')
describe('createSite', () => {
  test('dir should be provided', async () => {
    await expect(createSite()).rejects.toBeTruthy()
  })
  test('callback should be called', async () => {
    const mockCopy = jest.fn()
    const mockCheckUpdate = jest.fn()
    await createSite('non-exist-folder', mockCopy, mockCheckUpdate)
    expect(mockCopy).toBeCalled()
    expect(mockCopy).toBeCalledWith(
      path.join(process.cwd(), 'non-exist-folder')
    )
    expect(mockCheckUpdate).toBeCalled()
    expect(mockCheckUpdate).toBeCalledWith()
  })
})

// TODO mock fs
describe('createSite - mock fs', () => {
  beforeAll(() => {
    fse.__setPathExists(true)
  })
  test('throw error when path exists', async () => {
    await expect(createSite('blog')).rejects.toBeTruthy()
  })
})
