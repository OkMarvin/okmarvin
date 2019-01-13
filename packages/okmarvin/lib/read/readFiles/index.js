const path = require('path')
const promiseCatcher = require('@okmarvin/promise-catcher')
const promiseFileData = require('./promiseFileData')
const promiseFilesPath = require('./promiseFilesPath')
const logger = require('@parcel/logger')

module.exports = async ({ root, source, devHook }, callback) => {
  const [err, filesPath] = await promiseCatcher(
    promiseFilesPath(path.join(root, source))
  )
  if (err) {
    return callback(err)
  }
  // we just sample some files here for better dev performance
  const [errFromReadingFiles, files] = await promiseCatcher(
    Promise.all(
      (devHook
        ? Object.keys(filesPath).slice(0, 20)
        : Object.keys(filesPath)
      ).map(filePath => promiseFileData(path.join(root, source, filePath)))
    )
  )
  if (errFromReadingFiles) {
    return callback(errFromReadingFiles)
  }
  logger.verbose(`Collected ${files.length} markdown files`)
  callback(null, files)
}
