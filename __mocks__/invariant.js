module.exports = jest.fn((condition, msg) => {
  if (!condition) {
    const obj = {
      message: 'err',
      name: 'UserException'
    }
    throw obj
  }
})
