const readData = require('./readData')
const async = require('neo-async')
const logger = require('@okmarvin/logger')
module.exports = function (cwd) {
  async.waterfall([
    (callback) => callback(null, cwd),
    readData
  ], (err, results) => {
    logger.profile('Collect markdown files')
    if (err) throw err
  })
}
