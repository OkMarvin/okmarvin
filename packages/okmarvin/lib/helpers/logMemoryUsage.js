const logger = require('@parcel/logger')
module.exports = (type = 'rss') => {
  logger.verbose(
    `${type} memory used: ${(process.memoryUsage()[type] / 1024 / 1024).toFixed(
      2
    )}MB`
  )
}
