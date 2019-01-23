const async = require('neo-async')
const prepare = require('./prepare')
const compute = require('./compute')
const renderMarkdown = require('./renderMarkdown')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')

module.exports = (conn, callback) => {
  const tasks = [
    async.constant(conn),
    prepare,
    compute,
    renderMarkdown,
    write,
    copy,
    cleanup
  ]
  async.waterfall(tasks, callback)
}
