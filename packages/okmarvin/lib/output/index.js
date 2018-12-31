const async = require('neo-async')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')
const removeDestination = require('./removeDestination')

module.exports = (conn, callback) => {
  let tasks
  if (conn.clean === false) {
    tasks = [callback => callback(null, conn), render, write, copy, cleanup]
  } else {
    tasks = [
      callback => callback(null, conn),
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
