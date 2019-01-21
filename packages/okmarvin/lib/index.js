'use strict'

const async = require('neo-async')
const logger = require('@parcel/logger')
const { resolve } = require('path')
const { prettyTime } = require('@okmarvin/helpers')

const read = require('./read')
const parseFiles = require('./parseFiles')
const dispose = require('./dispose')
const output = require('./output')

const logMemoryUsage = require('./helpers/logMemoryUsage')

/**
 * An opinionated static site generator with Component as template.
 * @function okmarvin
 * @property {object} opts  - Options for okmarvin
 * @property {string} opts.root  - Root path
 * @property {string} opts.dest  - Destination directory
 * @property {function|boolean} opts.devHook - Hook for dev env
 * @property {number} opts.logLevel  - Log level
 * @property {boolean} opts.clean  - Enable incremental rebuild
 * @property {boolean} opts.builtAt
 *
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
    // warn user the possible bugs incremental rebuild might bring
    logger.warn('Incremental rebuild is not stable yet!!')
  }

  if (resolve(root, dest) === root) {
    return logger.error(`'dest' option cannot be set to current working directory`)
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
    ? (tasks = [...tasks, devHook]) // we'll let browser handle `dispose` in dev env
    : (tasks = [...tasks, dispose, output])

  // default callback for async waterfall
  function callback (err, _conn) { // we prefix conn with _ since we won't use it
    if (err) return logger.error(err)

    logMemoryUsage()
    logger.success(`Built in ${prettyTime(Date.now() - begin)}`)
    logger.success(`Your site is ready under '${dest}' directory.`)
  }

  async.waterfall(tasks, callbackFn || callback)
}
