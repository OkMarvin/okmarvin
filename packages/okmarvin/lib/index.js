const read = require('./read')
const async = require('neo-async')
const logger = require('@parcel/logger')
const parse = require('./parse')
const compose = require('./compose')
const calculate = require('./calculate')
const guard = require('./guard')
const render = require('./render')
const write = require('./write')
const copy = require('./copy')
const cleanup = require('./cleanup')
const prettyTime = require('./helpers/prettyTime')
/**
 * Marvin, the static site generator
 */
module.exports = function ({
  source = 'content',
  destination = 'dist',
  devHook = false, // we can hook into waterfall with devHook
  logLevel = 3,
  clean = true
} = {}) {
  logger.setOptions({ logLevel })
  logger.log('Ok Marvin, lets do it.')
  const conn = {
    root: process.cwd(),
    from: source,
    to: destination,
    builtAt: Date.now(),
    clean
  }
  // TODO make it as fast as u can
  let tasks = [callback => callback(null, conn), read, parse, compose, calculate, guard]
  if (devHook === false) {
    tasks = tasks.concat([render, write, copy])
    if (clean === false) {
      tasks = tasks.concat(cleanup)
    }
  } else {
    // const devHook = (conn, callback) => {}
    tasks = tasks.concat([devHook])
  }
  async.waterfall(tasks, (err, conn) => {
    if (err) return logger.error(err)
    const memoryUsage = process.memoryUsage()
    logger.verbose(
      `Memory usage:\n${Object.keys(memoryUsage)
        .map(key => `\t\t${key}: ${memoryUsage[key] / 1024 / 1024}MB`)
        .join('\n')}`
    )
    logger.success(`Built in ${prettyTime(Date.now() - conn.builtAt)}`)
    logger.success(`Your site is ready under '${destination}' directory.`)
  })
}
