'use strict'

const logger = require('@parcel/logger')

const promiseCatcher = require('@okmarvin/promise-catcher')
const promiseFileData = require('./promiseFileData')
const promiseFilesPath = require('./promiseFilesPath')

module.exports = async ({ root }, callback) => {
  // we read all .md files under root
  const [err, pathsOfMarkdownFile] = await promiseCatcher(
    promiseFilesPath(root, '{_posts,_pages}/**/*.md')
  )
  if (err) {
    return callback(err)
  }
  const [errFromReadingFiles, files] = await promiseCatcher(
    Promise.all(
      pathsOfMarkdownFile.map(filePath => promiseFileData(root, filePath))
    )
  )
  if (errFromReadingFiles) {
    return callback(errFromReadingFiles)
  }
  logger.verbose(`Collected ${files.length} markdown files`)
  callback(null, files)
}
