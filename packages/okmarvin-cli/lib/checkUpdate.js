const pkg = require('../package.json')
const checkForUpdate = require('update-check')
const logger = require('@parcel/logger')
module.exports = async function () {
  // check update
  let update = null
  logger.progress('Checking update for okmarvin...')
  try {
    update = await checkForUpdate(pkg)
  } catch (err) {
    return logger.error(`Failed to check for updates: ${err}`)
  }

  if (update) {
    logger.warn(`The latest version is ${update.latest}. Please update!`)
  }
}
