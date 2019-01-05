const promiseCatcher = require('../../helpers/promiseCatcher')
const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
module.exports = async ({ root }, callback) => {
  const [err, okmarvinConfig] = await promiseCatcher(
    promiseOkmarvinConfig(root)
  )
  if (err) {
    return callback(err)
  }
  callback(null, okmarvinConfig)
}
