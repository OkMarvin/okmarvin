const readData = require('./readData')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
const parseData = require('./parseData')
const composeList = require('./composeList')
const render = require('./render')
const writeFiles = require('./writeFiles')
const copyFileAssets = require('./copyFileAssets')
module.exports = function (cwd) {
  logger.profile('SSG')
  async.waterfall([
    (callback) => callback(null, cwd),
    readData,
    parseData,
    composeList,
    render,
    writeFiles,
    copyFileAssets
  ], (err, results) => {
    logger.profile('SSG')
    if (err) throw err
  })
}
