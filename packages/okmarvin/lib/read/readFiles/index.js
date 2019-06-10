const promiseCatcher = require('@okmarvin/promise-catcher')
const promiseFileData = require('./promiseFileData')
const promiseFilesPath = require('./promiseFilesPath')
const logger = require('@parcel/logger')

module.exports = async ({ root }, callback) => {
  // we read all kinds of files
  const [err, filesPath] = await promiseCatcher(
    promiseFilesPath(root, '{_posts,_pages}/**/*')
  )
  if (err) {
    return callback(err)
  }
  const pathsOfMarkdownFile = filesPath.filter(
    file => file.endsWith('.md') || file.endsWith('.markdown')
  )
  const fileAssets = filesPath.filter(
    file => !file.endsWith('.md') && !file.endsWith('.markdown')
  )
  // we just sample some files here for better dev performance
  const [errFromReadingFiles, files] = await promiseCatcher(
    Promise.all(
      pathsOfMarkdownFile.map(filePath => promiseFileData(root, filePath))
    )
  )
  if (errFromReadingFiles) {
    return callback(errFromReadingFiles)
  }
  logger.verbose(`Collected ${files.length} markdown files`)
  callback(null, { files, fileAssets })
}
