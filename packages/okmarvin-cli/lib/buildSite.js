const path = require('path')
const fs = require('fs-extra')
module.exports = function (cli, callback) {
  process.env.NODE_ENV = 'production'
  const { clean } = cli.flags
  const cwd = process.cwd()
  if (clean) {
    // clean dist first
    fs.remove(path.join(cwd, 'dist'), err => {
      if (err) console.error(err)
      callback()
    })
  } else {
    callback()
  }
}
