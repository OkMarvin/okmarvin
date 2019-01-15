const async = require('neo-async')
const prepare = require('./prepare')
const compute = require('./compute')
const renderMarkdown = require('./renderMarkdown')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')
const removeDestination = require('./removeDestination')

module.exports = (conn, callback) => {
  let tasks
  if (conn.clean === false) {
    tasks = [
      async.constant(conn),
      prepare,
      compute,
      renderMarkdown,
      write,
      copy,
      cleanup
    ]
  } else {
    tasks = [
      async.constant(conn),
      prepare,
      compute,
      (conn, callback) => {
        async.parallel(
          {
            conn: callback => renderMarkdown(conn, callback),
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
