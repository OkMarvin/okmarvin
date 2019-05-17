const async = require('neo-async')
const prepare = require('./prepare')
const compute = require('./compute')
const renderMarkdown = require('./renderMarkdown')
const write = require('./write')
const copy = require('./copy')

module.exports = (conn, callback) => {
  const tasks = [
    async.constant(conn),
    prepare,
    compute,
    (conn, callback) => callback(null, renderMarkdown(conn)),
    write,
    copy
  ]
  async.waterfall(tasks, callback)
}
