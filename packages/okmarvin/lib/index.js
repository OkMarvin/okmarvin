'use strict'

const async = require('neo-async')
const logger = require('@parcel/logger')
const { resolve } = require('path')

const read = require('./read')
const dispose = require('./dispose')
const output = require('./output')

const { prettyTime } = require('@okmarvin/helpers')
const logMemoryUsage = require('./helpers/logMemoryUsage')

const parseFiles = require('./parseFiles')

/**
 * An opinionated static site generator with Component as template.
 * @function okmarvin
 * @property {object} opts  - Options for okmarvin
 * @property {string} opts.root  - Root path
 * @property {string} opts.dest  - Destination directory
 * @property {function|boolean} opts.devHook - Hook for dev env
 * @property {number} opts.logLevel  - Log level
 * @property {boolean} opts.clean  - Enable incremental rebuild
 * @property {function} callbackFn - callback function
 */
module.exports = function okmarvin (
  {
    root = process.cwd(),
    dest = '_site',
    devHook = false,
    logLevel = 3,
    clean = true,
    builtAt = Date.now(),
    benchmark = false
  } = {},
  callbackFn
) {
  const begin = Date.now()

  logger.setOptions({ logLevel })

  if (clean === false) {
    // warn user the possible bugs `false` incremental rebuild might bring
    logger.warn('Incremental rebuild is not stable yet!!')
  }

  if (resolve(root, dest) === root) {
    return logger.error(`'dest' cannot be set to current working directory`)
  }

  // connection
  const conn = {
    root,
    dest,
    clean,
    devHook,
    builtAt
  }

  let tasks = [async.constant(conn), read, parseFiles]

  devHook
    ? (tasks = [...tasks, devHook])
    : (tasks = [...tasks, dispose, output])

  // default callback for async waterfall
  function callback (err, _conn) {
    if (err) return logger.error(err)

    logMemoryUsage()
    logger.success(`Built in ${prettyTime(Date.now() - begin)}`)
    logger.success(`Your site is ready under '${dest}' directory.`)
  }

  async.waterfall(tasks, callbackFn || callback)
}
