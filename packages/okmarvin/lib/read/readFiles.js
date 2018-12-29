const path = require('path')
const promiseCatcher = require('../helpers/promiseCatcher')
const promiseFileData = require('./promiseFileData')
const promiseFilesPath = require('./promiseFilesPath')

module.exports = async ({ root, from }, callback) => {
  const result = await promiseCatcher(promiseFilesPath(path.join(root, from)))
  if (result.length === 1) {
    return callback(result[0])
  }
  const filesResult = await promiseCatcher(
    Promise.all(result[1].map(filePath => promiseFileData(filePath)))
  )
  if (filesResult.length === 1) {
    return callback(filesResult[0])
  }
  callback(null, filesResult[1])
}
