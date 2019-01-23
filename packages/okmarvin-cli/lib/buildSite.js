'use strict'

const okmarvin = require('@okmarvin/okmarvin')
const fs = require('fs-extra')
const { join } = require('path')
module.exports = function({ flags }) {
  process.env.NODE_ENV = 'production'
  if (flags.clean) {
    // remove dest first
    fs.removeSync(join(process.cwd(), flags.dest))
  }
  okmarvin(flags)
}
