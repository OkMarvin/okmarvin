'use strict'

const async = require('neo-async')
const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')

const input = require('./input')
const output = require('./output')

const prettyTime = require('./helpers/prettyTime')

/**
 * An opinionated static site generator with Component as template.
 * @function okmarvin
 * @property {object} opts  - Options for okmarvin
 * @property {string} root  - Root path
 * @property {string} source  - Source directory
 * @property {string} dest  - Destination directory
 * @property {function|boolean} devHook - Hook for dev env
 * @property {number} logLevel  - Log level
 * @property {boolean} clean  - Enable incremental rebuild
 */
module.exports = function okmarvin ({
  root = process.cwd(),
  source = 'content',
  dest = 'dist',
  devHook = false,
  logLevel = 3,
  clean = true,
  benchmark = false
} = {}) {
  performance.mark('Start')

  const begin = performance.now()

  logger.setOptions({ logLevel })

  if (clean === false) {
    // warn user the possible bugs `false` incremental rebuild might bring
    logger.warn('Incremental rebuild is not stable yet!!')
  }

  const conn = {
    root,
    source,
    dest,
    clean,
    devHook,
    builtAt: Date.now()
  }

  let tasks

  const npc = async.constant(conn)

  devHook ? (tasks = [npc, input, devHook]) : (tasks = [npc, input, output])

  async.waterfall(tasks, (err, _conn) => {
    if (err) return logger.error(err)

    logger.verbose(
      `Total memory used: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )}MB`
    )
    logger.success(`Built in ${prettyTime(performance.now() - begin)}`)
    logger.success(`Your site is ready under '${dest}' directory.`)
    performance.mark('End')
    performance.measure('Start to End', 'Start', 'End')
  })
}
