'use strict'

const async = require('neo-async')

const read = require('./read')

const isAnyLayoutChanged = require('./isAnyLayoutChanged')
const isClientJsChanged = require('./isClientJsChanged')
const isOkmarvinConfigChanged = require('./isOkmarvinConfigChanged')
const isSiteConfigChanged = require('./isSiteConfigChanged')

const parse = require('./parse')
const compose = require('./compose')
const compute = require('./compute')
const guard = require('./guard')

module.exports = (conn, callback) => {
  const { clean } = conn
  const npc = async.constant(conn)
  let tasks
  if (clean) {
    // incremental rebuild disabled
    tasks = [npc, read, parse, compose, compute, guard]
  } else {
    // incremental rebuild enabled
    tasks = [
      npc,
      read,
      isAnyLayoutChanged,
      isClientJsChanged,
      isOkmarvinConfigChanged,
      isSiteConfigChanged,
      parse,
      compose,
      compute,
      guard
    ]
  }
  async.waterfall(tasks, callback)
}
