const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
module.exports = function (target) {
  fs.copy(path.join(__dirname, '..', 'okmarvin-starter'), target, err => {
    if (err) return logger.error(err)
    logger.success(`Site created at ${target}`)
    logger.log(
      `We are almost there! Make sure you finish the following steps:\n\n\t$ cd ${target}\n\t$ npm install`
    )
  })
}
