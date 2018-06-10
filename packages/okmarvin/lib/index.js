const readData = require('./readData')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
const parseData = require('./parseData')
const composeList = require('./composeList')
const guard = require('./guard')
const render = require('./render')
const writeFiles = require('./writeFiles')
const copyFileAssets = require('./copyFileAssets')
const copyThemeStatic = require('./copyThemeStatic')
/**
 * Static site generator
 * @param {string} cwd Current working directory
 * @param {string} source Content source directory
 * @param {string} destination Build target
 */
module.exports = function (cwd, source = 'content', destination = 'dist') {
  logger.profile('SSG')
  async.waterfall([
    (callback) => callback(null, cwd),
    readData,
    parseData,
    composeList,
    guard,
    render,
    writeFiles,
    copyFileAssets,
    copyThemeStatic
  ], (err, results) => {
    logger.profile('SSG')
    if (err) throw err
  })
}
