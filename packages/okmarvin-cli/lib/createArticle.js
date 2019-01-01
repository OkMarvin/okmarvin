const fs = require('fs-extra')
const path = require('path')
const { format } = require('date-fns')
const logger = require('@parcel/logger')
module.exports = function (cli) {
  const type = cli.input[1]
  const title = cli.input[2]
  const { source } = cli.flags

  const cwd = process.cwd()
  const target = path.join(cwd, source, type, title, 'index.md')
  if (fs.pathExistsSync(target)) {
    return logger.error(`${target} already exists`)
  }
  const data = `---
title: ${title}
date: ${format(new Date(), 'YYYY-MM-DD')}
---`
  fs.outputFile(target, data, err => {
    if (err) return logger.error(err)
    logger.success(`${target} created`)
  })
}
