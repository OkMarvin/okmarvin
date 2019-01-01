'use strict'
const fs = require('fs-extra')
const path = require('path')

const copyStarter = require('./copyStarter')
const inquirer = require('inquirer')
module.exports = async function (cli) {
  const dir = cli.input[2]
  const cwd = process.cwd()
  const target = path.join(cwd, dir)

  if (fs.pathExistsSync(target)) {
    return inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'override',
          message: `'${dir}' directory already exists, do you want to overide it?`,
          default: true
        }
      ])
      .then(({ override }) => {
        if (override) {
          fs.removeSync(target)
          copyStarter(target)
        } else {
          // do nothing
        }
      })
  } else {
    copyStarter(target)
  }
}
