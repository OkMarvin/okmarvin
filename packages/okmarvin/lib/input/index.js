const async = require('neo-async')
const read = require('./read')
const parse = require('./parse')
const compose = require('./compose')
const calculate = require('./calculate')
const guard = require('./guard')
module.exports = (conn, callback) => {
  async.waterfall(
    [
      callback => callback(null, conn),
      read,
      parse,
      compose,
      calculate,
      guard
    ], callback
  )
}
