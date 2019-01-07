'use strict'

const async = require('neo-async')
const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')

const input = require('./input')
const output = require('./output')

const prettyTime = require('./helpers/prettyTime')

/**
 * An opinionated static site generator with Component as template.
 */
module.exports = function ({
  root = process.cwd(),
  source = 'content', // where to read markdown files
  dest = 'dist', // where to output
  devHook = false, // we can hook into waterfall with devHook
  logLevel = 3,
  clean = true, // default to true, it might have bugs when set to false
  benchmark = false
} = {}) {
  performance.mark('Start')
  const begin = performance.now()
  logger.setOptions({ logLevel })

  if (clean === false) {
    // warn user the possible bugs `false` clean might bring
    logger.warn('Incremental rebuild is not stable yet!!')
  }

  const conn = {
    root,
    from: source,
    to: dest,
    builtAt: Date.now(),
    clean,
    devHook
  }

  let tasks

  devHook
    ? (tasks = [callback => callback(null, conn), input, devHook])
    : (tasks = [callback => callback(null, conn), input, output])

  async.waterfall(tasks, (err, conn) => {
    if (err) return logger.error(err)

    logger.verbose(
      `Total memory used: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )}MB`
    )
    logger.success(`Built in ${prettyTime(performance.now() - begin)}`)
    performance.mark('End')
    performance.measure('Start to End', 'Start', 'End')
    logger.success(`Your site is ready under '${dest}' directory.`)
  })
}
