const promiseCatcher = require('../helpers/promiseCatcher')
const promiseOkmarvinConfig = require('./promiseOkmarvinConfig')
module.exports = async ({ root }, callback) => {
  const result = await promiseCatcher(promiseOkmarvinConfig(root))
  if (result.length === 1) {
    return callback(result[0])
  }
  callback(null, result[1])
}
