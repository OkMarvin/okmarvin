const async = require('neo-async')
const loadCss = require('./loadCss')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')
const removeDestination = require('./removeDestination')

module.exports = (conn, callback) => {
  let tasks
  if (conn.clean === false) {
    tasks = [async.constant(conn), loadCss, render, write, copy, cleanup]
  } else {
    tasks = [
      async.constant(conn),
      (conn, callback) => {
        async.parallel(
          {
            conn: callback => render(conn, callback),
            _conn: callback => removeDestination(conn, callback)
          },
          (err, result) => {
            if (err) return callback(err)
            const { conn } = result
            callback(null, conn)
          }
        )
      },
      write,
      copy
    ]
  }
  async.waterfall(tasks, callback)
}
