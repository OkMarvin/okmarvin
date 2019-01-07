const logger = require('@parcel/logger')
module.exports = () => {
  logger.verbose(
    `Total memory used: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
      2
    )}MB`
  )
}
