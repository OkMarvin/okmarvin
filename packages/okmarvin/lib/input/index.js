const async = require('neo-async')
const read = require('./read')
const diffLayout = require('./diffLayout')
const parse = require('./parse')
const compose = require('./compose')
const compute = require('./compute')
const guard = require('./guard')
module.exports = (conn, callback) => {
  async.waterfall(
    [
      callback => callback(null, conn),
      read,
      diffLayout,
      parse,
      compose,
      compute,
      guard
    ], callback
  )
}
