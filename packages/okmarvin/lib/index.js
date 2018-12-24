const read = require('./read')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
const parse = require('./parse')
const compose = require('./compose')
const guard = require('./guard')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
/**
 * Marvin, the static site generator
 */
module.exports = function ({
  source = 'content',
  destination = 'dist',
  devHook = false // we can hook into waterfall with devHook
} = {}) {
  logger.profile('SSG')
  const conn = {
    root: process.cwd(),
    from: source,
    to: destination,
    builtAt: Date.now()
  }
  let tasks = [callback => callback(null, conn), read, parse, compose, guard]
  if (devHook === false) {
    tasks = tasks.concat([render, write, copy])
  } else {
    // const devHook = (conn, callback) => {}
    tasks = tasks.concat([devHook])
  }
  async.waterfall(tasks, (err, results) => {
    logger.profile('SSG')
    if (err) throw err
  })
}
