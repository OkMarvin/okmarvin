const readData = require('./readData')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
const parseData = require('./parseData')
const composeList = require('./composeList')
const guard = require('./guard')
const render = require('./render')
const writeFiles = require('./writeFiles')
const copy = require('./copy')
const configStore = require('./configStore')
/**
 * Static site generator
 * @param {string} cwd Current working directory
 * @param {string} source Content source directory
 * @param {string} destination Build target
 */
module.exports = function (source = 'content', destination = 'dist') {
  logger.profile('SSG')
  configStore.add({
    cwd: process.cwd(),
    source,
    destination
  })
  async.waterfall([
    readData,
    parseData,
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
