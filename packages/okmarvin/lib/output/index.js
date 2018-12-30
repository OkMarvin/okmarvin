const async = require('neo-async')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')

module.exports = (conn, callback) => {
  let tasks = [callback => callback(null, conn), render, write, copy]
  if (conn.clean === false) {
    tasks = tasks.concat(cleanup)
  }
  async.waterfall(tasks, callback)
}
