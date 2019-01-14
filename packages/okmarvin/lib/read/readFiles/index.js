const path = require('path')
const promiseCatcher = require('@okmarvin/promise-catcher')
const promiseFileData = require('./promiseFileData')
const promiseFilesPath = require('./promiseFilesPath')
const logger = require('@parcel/logger')

module.exports = async ({ root, source, devHook }, callback) => {
  const pathToSource = path.join(root, source)
  const [err, filesPath] = await promiseCatcher(promiseFilesPath(pathToSource))
  if (err) {
    return callback(err)
  }
  // we just sample some files here for better dev performance
  const [errFromReadingFiles, files] = await promiseCatcher(
    Promise.all(
      (devHook ? filesPath.slice(0, 20) : filesPath).map(filePath =>
        promiseFileData(pathToSource, filePath)
      )
    )
  )
  if (errFromReadingFiles) {
    return callback(errFromReadingFiles)
  }
  logger.verbose(`Collected ${files.length} markdown files`)
  callback(null, files)
}
