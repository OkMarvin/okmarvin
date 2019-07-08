const async = require('neo-async')
const prepare = require('./prepare')
const compute = require('./compute')
const write = require('./write')
const copy = require('./copy')

module.exports = (conn, callback) => {
  const tasks = [
    async.constant(conn),
    prepare,
    compute,
    write,
    copy
  ]
  async.waterfall(tasks, callback)
}
