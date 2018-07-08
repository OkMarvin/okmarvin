const pkg = require('../package.json')
const checkForUpdate = require('update-check')
module.exports = async function () {
  // check update
  let update = null

  try {
    update = await checkForUpdate(pkg)
  } catch (err) {
    console.error(`Failed to check for updates: ${err}`)
  }

  if (update) {
    console.log(`The latest version is ${update.latest}. Please update!`)
  }
}
