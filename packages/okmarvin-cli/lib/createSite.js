'use strict'
const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
const checkUpdate = require('./checkUpdate')
const copyStarter = require('./copyStarter')
module.exports = async function (cli) {
  await checkUpdate()
  const dir = cli.input[2]
  if (!dir) {
    return logger.error(`Please provide a path for your new site`)
  }
  const cwd = process.cwd()
  const target = path.join(cwd, dir)

  if (fs.pathExistsSync(target)) {
    return logger.error(`${target} already exists`)
  }
  copyStarter(target)
}
