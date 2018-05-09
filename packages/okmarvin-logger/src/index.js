const winston = require('winston')
const { format } = winston
const { colorize, simple, combine } = format
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), simple())
    })
  ]
})
module.exports = logger
