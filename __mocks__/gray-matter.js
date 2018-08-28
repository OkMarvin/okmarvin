'use strict'
let result = null
const matter = jest.fn(() => result)
matter.__setResult = (v) => {
  result = v
}
module.exports = matter
