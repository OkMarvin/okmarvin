'use strict'

const okmarvin = require('@okmarvin/okmarvin')
module.exports = function({ flags }) {
  process.env.NODE_ENV = 'production'
  okmarvin(flags)
}
