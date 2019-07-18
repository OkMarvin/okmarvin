const fs = require('fs-extra')
const path = require('path')
const { format } = require('date-fns')
const logger = require('@parcel/logger')
module.exports = function(cli) {
  const type = cli.input[1]
  const title = cli.input[2]

  const cwd = process.cwd()
  const date = format(new Date(), 'YYYY/MM/DD')
  const target = path.join(cwd, type, date, title, 'index.md')
  if (fs.pathExistsSync(target)) {
    return logger.error(`${target} already exists`)
  }
  const data = `---
title: ${title}
date: ${date}
---`
  fs.outputFile(target, data, err => {
    if (err) return logger.error(err)
    logger.success(`${path.join(type, date, title, 'index.md')} created`)
  })
}
