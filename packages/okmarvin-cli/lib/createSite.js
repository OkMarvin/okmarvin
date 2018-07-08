'use strict'
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const invariant = require('invariant')
module.exports = async function (dir = undefined, copyStarter, checkUpdate = function () {}) {
  invariant(dir, chalk.red('Please provide a path'))

  const cwd = process.cwd()
  const target = path.join(cwd, dir)

  invariant(!fs.pathExistsSync(target), chalk.red(`${target} already exists`))
  await checkUpdate()

  copyStarter && copyStarter(target)
}
