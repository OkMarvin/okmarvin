const path = require('path')
const fs = require('fs-extra')
const okmarvin = require('@okmarvin/okmarvin')
module.exports = function (cli) {
  process.env.NODE_ENV = 'production'
  const {
    clean = true,
    logLevel = 3,
    source = 'content',
    destination = 'dist'
  } = cli.flags
  const cwd = process.cwd()
  if (clean === true) {
    // clean destination first
    fs.remove(path.join(cwd, destination), err => {
      if (err) console.error(err)
      okmarvin({ logLevel, source, destination })
    })
  } else {
    okmarvin({ logLevel, source, destination })
  }
}
