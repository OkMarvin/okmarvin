const read = require('./read')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
const parse = require('./parse')
const composeList = require('./composeList')
const guard = require('./guard')
const render = require('./render')
const writeFiles = require('./writeFiles')
const copy = require('./copy')
/**
 * Static site generator
 * @param {string} cwd Current working directory
 * @param {string} source Content source directory
 * @param {string} destination Build target
 */
module.exports = function (source = 'content', destination = 'dist') {
  logger.profile('SSG')
  const conn = {
    root: process.cwd(),
    from: source,
    to: destination,
    builtAt: new Date().getTime()
  }
  async.waterfall([
    (callback) => callback(null, conn),
    read,
    parse,
    composeList,
    guard,
    render,
    writeFiles,
    copy
  ], (err, results) => {
    logger.profile('SSG')
    if (err) throw err
  })
}
