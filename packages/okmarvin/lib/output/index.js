const async = require('neo-async')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
module.exports = (conn, callback) => {
  async.waterfall(
    [
      callback => callback(null, conn),
      render,
      write,
      copy
    ], callback
  )
}
