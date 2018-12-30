
const async = require('neo-async')
const logger = require('@parcel/logger')

const cleanup = require('./cleanup')

const input = require('./input')
const output = require('./output')

const prettyTime = require('./helpers/prettyTime')
/**
 * Ok Marvin, an opinionated static site generator
 */
module.exports = function ({
  source = 'content', // where to read markdown files
  destination = 'dist', // where to output
  devHook = false, // we can hook into waterfall with devHook
  logLevel = 3,
  clean = true // default to true, it might have bugs when set to false
} = {}) {
  logger.setOptions({ logLevel })
  if (clean === false) {
    logger.warn('Might have bug when clean set to `false`!!')
  }
  logger.log('Ok Marvin, lets do it.')

  const conn = {
    root: process.cwd(),
    from: source,
    to: destination,
    builtAt: Date.now(),
    clean
  }

  let tasks = [
    callback => callback(null, conn),
    input
  ]
  if (devHook === false) {
    tasks = tasks.concat([output])
    if (clean === false) {
      tasks = tasks.concat(cleanup)
    }
  } else {
    // use okmarvin in dev environment for developing theme
    // devHook should be function
    // function devHook (conn, callback) {}
    tasks = tasks.concat([devHook])
  }
  async.waterfall(tasks, (err, conn) => {
    if (err) return logger.error(err)
    logger.verbose(
      `Total memory used: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )}MB`
    )
    logger.success(`Built in ${prettyTime(Date.now() - conn.builtAt)}`)
    logger.success(`Your site is ready under '${destination}' directory.`)
  })
}
