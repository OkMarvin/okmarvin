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
 * @property {string} opts.root  - Root path, defaults to current working directory
 * @property {string} opts.dest  - Where to output site
 * @property {number} opts.logLevel  - Log level, check https://parceljs.org/cli.html#change-log-level for detail
 * @property {boolean} opts.builtAt - When the build starts
 *
 * @property {function} callbackFn - Function to run at the end
 */
const okmarvin = (
  {
    root = process.cwd(),
    dest = '_site',
    logLevel = 3,
    builtAt = Date.now()
  } = {},
  callbackFn
) => {
  const begin = Date.now()

  logger.setOptions({ logLevel })

  if (resolve(root, dest) === root) {
    return logger.error(`'dest' cannot be set to current working directory`)
  }

  // connection (get this name from PhoenixFramework)
  const conn = {
    root,
    dest,
    builtAt
  }

  const tasks = [
    async.constant(conn),
    read,
    parseFiles,
    (conn, callback) => callback(null, dispose(conn)),
    output
  ]

  // default callback for async waterfall
  const callback = (err, _conn) => {
    // we prefix conn with _ since we won't use it
    if (err) return logger.error(err)

    logMemoryUsage()
    logger.success(`Built in ${prettyTime(Date.now() - begin)}`)
    logger.success(`Your site is ready under '${dest}' directory.`)
  }

  async.waterfall(tasks, callbackFn || callback)
}
module.exports = okmarvin
