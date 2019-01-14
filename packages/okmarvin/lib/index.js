'use strict'

const async = require('neo-async')
const logger = require('@parcel/logger')
const { performance } = require('perf_hooks')
const { resolve, join } = require('path')
const fs = require('fs-extra')

const read = require('./read')
const dispose = require('./dispose')
const output = require('./output')

const { prettyTime } = require('@okmarvin/helpers')
const logMemoryUsage = require('./helpers/logMemoryUsage')

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
  builtAt = Date.now(),
  benchmark = false
} = {}) {
  performance.mark('Start')

  const begin = performance.now()

  logger.setOptions({ logLevel })

  if (clean === false) {
    // warn user the possible bugs `false` incremental rebuild might bring
    logger.warn('Incremental rebuild is not stable yet!!')
  }

  if (resolve(root, dest) === root) {
    return logger.error(`'dest' cannot be set to current working directory`)
  }

  if (!fs.existsSync(join(root, source))) {
    // user should fix it
    return logger.warn(
      `Oops, nothing to do because "${join(
        root,
        source
      )}" directory does not exist.`
    )
  }

  // connection
  const conn = {
    root,
    source,
    dest,
    clean,
    devHook,
    builtAt
  }

  let tasks

  devHook
    ? (tasks = [async.constant(conn), read, dispose, devHook])
    : (tasks = [async.constant(conn), read, dispose, output])

  async.waterfall(tasks, (err, _conn) => {
    if (err) return logger.error(err)

    logMemoryUsage()
    logger.success(`Built in ${prettyTime(performance.now() - begin)}`)
    logger.success(`Your site is ready under '${dest}' directory.`)
    performance.mark('End')
    performance.measure('Start to End', 'Start', 'End')
  })
}
